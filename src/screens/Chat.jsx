import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import { Modal, Button } from "react-bootstrap";

import { Brief } from "../components/Brief";
import { ChatDiscussion, ChatInput, } from "../components/ChatDiscussion";
import { ChatWrapper } from "../components/ChatWrapper";

import api, { url } from "../lib/api";
import logo from "./../components/ChatDiscussion/logo.png";

const connectMessage = () => {
  return {
    username: "",
    msg: JSON.stringify({ message: "You are connected" }),
  };
};

const maxMessages = 50;
export default class Chat extends Component {
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
    name: null
  };

  isPlaying = false;

  constructor(props) {
    super(props);

    this.socket = io(url);
    this.socket.on("connect", () => { });
  }

  // Initialize socket events
  componentDidMount() {
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
      const { messages, audio } = this.state;

      console.log("Operator said", message);

      messages.push(message);
      api.get(`/voice/${message.id}`)
        .then(data => {
          audio.push(`${url}/${data.data.file}`);
          this.setState({ audio }, () => this.playAudio())
        })

      if (messages.length > maxMessages) this.experimentDone();

      this.setState({
        messages,
        operatorWriting: false,
        clientWriting: false,
        sending: false,
      });
      this.playAudio();
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
    const { bot } = this.props;
    const { discussion_id, language,name } = this.state;

    this.clearAudio();
    const cleanMessage = message.replace("\n",'')
    this.socket.emit("clientSay", {
      name,
      bot,
      discussion_id,
      message:cleanMessage,
      language,
    });
  };


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

  chooseLanguage = (language) => {
    const { name } = this.state

    if (!name || name.length < 3) {
      alert('Name is too short')
      return
    }
    this.setState({ language, showModal: false });
    // create session and start discussion
    this.socket.emit("clientConnected", { name,language });
  };
  updateName = (e) => {
    this.setState({ name: e.target.value })
  }

  render() {
    const {
      discussion_id,
      messages,
      clientWriting,
      operatorWriting,
      currentAudio,
      showModal,
      experimentActive,
      name
    } = this.state;

    return (
      <ChatWrapper>
        <Modal show={showModal}>
          <Modal.Header>
            <Modal.Title>Hello!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">What is your name?</label>
              <input type="text" autoComplete="given-name" className="form-control" value={name} id="exampleInputEmail1" onChange={this.updateName} placeholder="First name" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.chooseLanguage("en-US")}
            >
              American English
            </Button>{" "}
            <Button
              variant="primary"
              onClick={() => this.chooseLanguage("en-UK")}
            >
              British English
            </Button>{" "}
            {/* <Button
              variant="primary"
              onClick={() => this.chooseLanguage("de-DE")}
            >
              Deutsch
            </Button>{" "}
            <Button
              variant="primary"
              onClick={() => this.chooseLanguage("he-IL")}
            >
              עברית
            </Button>{" "} */}
          </Modal.Footer>
        </Modal>

        {currentAudio && (
          <audio
            src={currentAudio}
            autoPlay={true}
            onPlay={this.audioPlayStarted}
            onEnded={this.audioPlayEnded}
          />
        )}

        {experimentActive && (
          <Fragment>
            <div className="contact-profile">
              <img src={logo} alt="" />
              <p>Zaha-AI</p>  
              <small>The chat concludes in {maxMessages - messages.length} messages.</small>
              <Button style={{ float: "right",margin:10 }} size="sm" variant="outline-danger" onClick={() => this.experimentDone()}>Finish chat</Button>
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
                  handleSend={this.handleSend}
                  updateKeyUp={this.updateKeyUp}
                />


              </div>
            </div>
          </Fragment>
        )}
        {!experimentActive && <Brief discussion_id={discussion_id} />}
      </ChatWrapper>
    );
  }
}
Chat.propTypes = {
  bot: PropTypes.string,
};
