import React, { Component } from "react";
import { io } from "socket.io-client";
import { Modal, Button } from "react-bootstrap";
import { ReactMic } from "react-mic";

import { ChatDiscussion } from "../components/ChatDiscussion";
import { ChatWrapper } from "../components/ChatWrapper";

import { url } from "../lib/api";

import logo from "./../components/ChatDiscussion/logo.png";

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

const RecordButton = function (props) {
  return (
    <button type="button" style={{ width: "100%" }} {...props}>
      Click to speak
    </button>
  );
};

const RecordingButton = function (props) {
  return (
    <button
      type="button"
      style={{ width: "100%", backgroundColor: "red" }}
      {...props}
    >
      Click to stop
    </button>
  );
};

const SendingButton = function (props) {
  return (
    <button
      disabled={true}
      type="button"
      style={{ width: "100%", backgroundColor: "grey" }}
      {...props}
    >
      Sending...
    </button>
  );
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
    currentAudio: null,
    showModal: true,
    language: null,
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

      console.log("Client said", message);

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

      console.log("Operator said", message);

      messages.push(message);
      audio.push(`${url}/${message.audio}`);

      this.setState({
        messages,
        audio,
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

  handleSend = (messageToServer) => {
    const { discussion_id, language } = this.state;

    this.socket.emit("clientSay", {
      discussion_id,
      message: messageToServer,
      language,
    });
  };

  onclickRecording = () => {
    const { record } = this.state;
    if (record) this.stopRecording();
    else this.startRecording();
  };

  startRecording = () => {
    this.setState({ record: true });
    this.clearAudio();
  };

  stopRecording = () => {
    this.setState({ record: false });
  };

  onStop = (recordedBlob) => {
    const { discussion_id, language } = this.state;
    this.setState({ sending: true });

    convertToBase64(recordedBlob.blob).then((base64) => {
      const json = {
        discussion_id,
        audio: base64,
        language,
      };

      console.log("ClientVoice", json);
      this.socket.emit("clientVoice", json);
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
    this.setState({ audio: [], currentAudio: null });
  };

  chooseLanguage = (language) => {
    this.setState({ language, showModal: false });
    // create session and start discussion
    this.socket.emit("clientConnected", { language });
  };

  render() {
    const {
      messages,
      clientWriting,
      operatorWriting,
      currentAudio,
      record,
      sending,
      showModal,
    } = this.state;

    return (
      <ChatWrapper>
        <Modal show={showModal}>
          <Modal.Header>
            <Modal.Title>Choose Language</Modal.Title>
          </Modal.Header>
          <Modal.Body>What language you prefer?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.chooseLanguage("en-US")}
            >
              English
            </Button>{" "}
            <Button
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
            </Button>{" "}
            
          </Modal.Footer>
        </Modal>
        <div style={{ display: "none" }}>
          <ReactMic
            record={record}
            className="sound-wave"
            onStop={this.onStop}
            strokeColor="#000000"
            visualSetting="sinewave"
            echoCancellation={true} // defaults -> false
            autoGainControl={true} // defaults -> false
            noiseSuppression={true} // defaults -> false
          />
        </div>
        {currentAudio && (
          <audio
            src={currentAudio}
            autoPlay={true}
            onPlay={this.audioPlayStarted}
            onEnded={this.audioPlayEnded}
          />
        )}

        <div className="contact-profile">
          <img src={logo} alt="" />
          <p>Frank AI Wright</p>
        </div>
        <ChatDiscussion
          messages={messages}
          clientWriting={clientWriting}
          operatorWriting={operatorWriting}
          handleClickOption={this.handleSend}
        />

        <div className="message-input">
          <div className="wrap">
            {sending ? (
              <SendingButton />
            ) : record ? (
              <RecordingButton onClick={this.onclickRecording} />
            ) : (
              <RecordButton onClick={this.onclickRecording} />
            )}
          </div>
        </div>
      </ChatWrapper>
    );
  }
}
