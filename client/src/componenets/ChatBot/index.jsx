import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";

import ChatDiscussion from "./ChatDiscussion";
import ChatInput from "./ChatInput";
import LangModal from "./LangSelect"
import ChatWrapper from "./ChatWrapper";

import { getUrl } from "../Task/NextButton"
import Alert from '@mui/material/Alert';

import api, { url } from "../../services/api";

import logo from "./../../assets/img/logo.png";

const connectMessage = () => {
    return {
        username: "",
        msg: JSON.stringify({ message: "You are connected" }),
    };
};

const maxMessages = 50;

export default class ChatBot extends Component {
    state = {
        messages: [],
        discussion_id: null,
        clientWriting: false,
        operatorWriting: false,
        audio: [],
        record: false,
        sending: false,
        currentAudio: null,
        showModal: true,
        language: null,
        experimentActive: true,
        artifacts: false,
        user: false
    };

    isPlaying = false;

    constructor(props) {
        super(props);

        this.socket = io(url);
        this.socket.on("connect", () => { });
    }

    chooseLanguage = (language) => {
        const { artifact, user } = this.state;
        const { task } = this.props

        this.setState({ language, showModal: false });
        console.debug("language set", language)

        // create session and start discussion
        this.socket.emit("clientConnected", {
            language,
            artifact,
            user,
            TaskId: task.id
        });
    };

    // Initialize socket events
    componentDidMount() {
        const { ArtifactId,lang } = this.props

        const promises = [];
        if (ArtifactId) {
            const promise1 = api
                .get('artifacts/' + ArtifactId)
                .then(data => this.setState({ artifact: data }))
            promises.push(promise1)
        }

        const promise2 = api
            .get('/sign/me/')
            .then(data => this.setState({ user: data }))
        promises.push(promise2)

        Promise.all(promises)
            .then(()=>{
                // if provided by props, set language and start
                if (lang){
                    // ugly hack
                    switch(lang){
                        case 'he':this.chooseLanguage('he-IL');break;
                        case 'en':this.chooseLanguage('en-UK');break;
                        case 'ar':this.chooseLanguage('ar-AR');break;
                    }
                    
                }
            })
        

        // get discussion id and show a connected message
        this.socket.on("start", (data) => {
            const { messages } = this.state;
            const { discussion_id } = data;

            messages.push(connectMessage());

            this.setState({ discussion_id, messages });
        });

        // get event from server that the user say something.
        // Normally this is speech to text
        this.socket.on("clientSaid", (message) => {
            const { messages } = this.state;

            console.log("Client said", message);

            messages.push(message);

            this.setState({ messages, clientWriting: false, sending: false });
        });

        // get messages from operator
        this.socket.on("operatorSaid", (message) => {
            const { messages, audio, discussion_id } = this.state;

            console.log("Operator said", message);

            messages.push(message);

            api.get(`/voice/${discussion_id}/${message.id}`)
                .then(data => {
                    audio.push(`${url}/${data.file}`);
                    this.setState({ audio }, () => this.playAudio())
                })

            if (messages.length > maxMessages) this.experimentDone();

            this.setState({
                messages,
                operatorWriting: false,
                clientWriting: false,
                sending: false,
            });

        });

        // make operator writing animation.
        this.socket.on("operatorWriting", () => {
            this.setState({ operatorWriting: true });

            if (this.operatorInterval) {
                clearInterval(this.operatorInterval);
            }

            this.operatorInterval = setTimeout(() => {
                this.setState({ operatorWriting: false });
            }, 2500);
        });
    }

    experimentDone = () => {
        this.setState({ experimentActive: false });
    };

    updateKeyUp = () => {
        this.socket.emit("clientWriting");
    };

    handleSend = (message) => {
        const { bot, task } = this.props;
        const { discussion_id, language } = this.state;

        this.clearAudio();

        this.socket.emit("clientSay", {
            bot,
            discussion_id,
            TaskId: task.id,
            message,
            language,
        });
    };

    // handleSendRecording = (recordedBase64) => {
    //     const { discussion_id, language } = this.state;
    //     this.setState({ sending: true });

    //     const json = {
    //         discussion_id,
    //         audio: recordedBase64,
    //         language,
    //     };

    //     console.log("Send clientVoice");
    //     this.socket.emit("clientVoice", json);
    //     return true;
    // };

    playAudio = () => {
        if (!this.isPlaying) {
            this.audioPlayEnded();
        }
    };
    audioPlayStarted = () => {
        this.isPlaying = true;
    };

    audioPlayEnded = () => {
        const { audio } = this.state;
        this.isPlaying = false;
        if (!audio.length) {
            return;
        }
        const currentAudio = audio.shift();
        this.setState({ currentAudio });
    };

    clearAudio = () => {
        this.isPlaying = false;
        this.setState({ audio: [], currentAudio: null });
    };



    render() {
        const {
            messages,
            clientWriting,
            operatorWriting,
            currentAudio,
            discussion_id,
            experimentActive,
            language
        } = this.state;
        const { ArtifactId } = this.props

        if (!experimentActive) {
            const [langCode,] = language.split('_')
            const to = getUrl() + `&artifactId=${ArtifactId}&lang=${langCode}&discussion_id=${discussion_id}`
            return <Navigate to={to} />
        }
        return (
            <ChatWrapper>
                {!language && <LangModal initialOpen={true} callback={this.chooseLanguage} />}

                {currentAudio && (
                    <audio
                        src={currentAudio}
                        autoPlay={true}
                        onPlay={this.audioPlayStarted}
                        onEnded={this.audioPlayEnded}
                    />
                )}


                <div className="contact-profile">
                    <img src={logo} alt="Chatbot" />
                    <p>Zaha AI - Architecture bot</p>
                    {maxMessages - messages.length < 10 && <Alert severity="warning">The chat will conclude automatically in {maxMessages - messages.length} messages.</Alert>}
                </div>
                <ChatDiscussion
                    messages={messages}
                    clientWriting={clientWriting}
                    operatorWriting={operatorWriting}
                    handleClickOption={this.handleSend}
                />
                <div className="message-input">
                    <div className="wrap">
                        <ChatInput
                            canFinish={messages.length > 6}
                            handleSend={this.handleSend}
                            updateKeyUp={this.updateKeyUp}
                            experimentDone={this.experimentDone}
                        />
                    </div>
                </div>

            </ChatWrapper>
        );
    }
}
ChatBot.propTypes = {
    bot: PropTypes.string,
    task: PropTypes.object,
    ArtifactId: PropTypes.number,
    lang: PropTypes.string
};
