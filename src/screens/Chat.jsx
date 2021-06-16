import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { io } from "socket.io-client";

import { url } from "../lib/api";
import { ChatDiscussion } from "../components/ChatDiscussion";
// import { VideoCapture } from "../components/VideoCapture";
import { ReactMic } from "react-mic";

const connectMessage = () => {
  return {
    username: "",
    msg: JSON.stringify({ message: "You are connected" }),
  };
};

const convertToBase64 = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      // strip data
      const base64result = reader.result.split(",")[1];
      resolve(base64result);
    };
  });
};

export default class Chat extends Component {
  state = {
    messages: [],
    discussion_id: null,
    clientWriting: false,
    operatorWriting: false,
    audio: [],
    record: false,
    sending: false,
    currentAudio:null,
  };

  isPlaying = false;

  constructor(props) {
    super(props);

    this.socket = io(url);
    this.socket.on("connect", () => {});
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

      messages.push(message);

      this.setState({ messages, clientWriting: false, sending: false });
    });

    // Show writing animation
    this.socket.on("clientWriting", () => {
      this.setState({ clientWriting: true });

      if (this.clientInterval) {
        clearInterval(this.clientInterval);
      }

      this.clientInterval = setTimeout(() => {
        this.setState({ clientWriting: false });
      }, 2500);
    });

    // get messages from operator
    this.socket.on("operatorSaid", (message) => {
      const { messages, audio } = this.state;

      messages.push(message);
      audio.push(`${url}/${message.audio}`);

      this.setState({
        messages,
        audio,
        operatorWriting: false,
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

    // create session and start discussion
    this.socket.emit("clientConnected");
  }

  startRecording = () => {
    this.setState({ record: true });
    this.socket.emit("clientWriting");
  };

  stopRecording = () => {
    this.setState({ record: false });
  };

  onStop = (recordedBlob) => {
    this.setState({ sending: true });

    const { discussion_id } = this.state;
    convertToBase64(recordedBlob.blob).then((base64) => {
      const json = {
        discussion_id,
        audio: base64,
      };

      this.socket.emit("clientVoice", json);
    });
  };

  playAudio = () => {
    if (!this.isPlaying){
      this.audioPlayEnded();
    }
  }
  audioPlayStarted = () => {
    this.isPlaying=true
  }

  audioPlayEnded = () => {
    const{ audio} = this.state;
    this.isPlaying=false
    if (!audio.length) {
      return
    }
    const currentAudio = audio.shift()
   
    this.setState({currentAudio})
  };

  render() {
    const {
      messages,
      clientWriting,
      operatorWriting,
      currentAudio,
      record,
      sending,
    } = this.state;


    return (
      <Container>
        <Row>
          <Col>
            {currentAudio && (
              <audio
                src={currentAudio}
                autoPlay={true}
                onPlay={this.audioPlayStarted}
                onEnded={this.audioPlayEnded}
              />
            )}

            <ReactMic
              record={record}
              className="sound-wave"
              onStop={this.onStop}
              strokeColor="#000000"
              width="300"
              visualSetting="sinewave"
              echoCancellation={true} // defaults -> false
              autoGainControl={true} // defaults -> false
              noiseSuppression={true} // defaults -> false
            />
            <br />
            <button
              disabled={sending}
              onMouseDown={this.startRecording}
              onMouseUp={this.stopRecording}
              type="button"
              className="btn-primary"
            >
              Speak
            </button>
          </Col>
          <Col>
            <ChatDiscussion
              messages={messages}
              clientWriting={clientWriting}
              operatorWriting={operatorWriting}
              handleClickOption={this.handleSend}
            />
            {/* <ChatInput
              handleSend={this.handleSend}
              updateKeyUp={this.updateKeyUp}
            /> */}
          </Col>
        </Row>
      </Container>
    );
  }
}
