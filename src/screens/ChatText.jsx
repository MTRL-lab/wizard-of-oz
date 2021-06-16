import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { io } from "socket.io-client";

import api, { url } from "../lib/api";
import { ChatDiscussion, ChatInput } from "../components/ChatDiscussion";
// import { VideoCapture } from "../components/VideoCapture";
import {ReactMic} from "react-mic"

const connectMessage = () => {
  return {
    username: "",
    msg: JSON.stringify({ message: "You are connected" }),
  };
};
export default class Chat extends Component {
  state = {
    messages: [],
    discussion_id: null,
    clientWriting: false,
    operatorWriting: false,
  };

  constructor(props) {
    super(props);
    this.videoCaptureRef = React.createRef();

    this.socket = io(url);
    this.socket.on("connect", () => {
      // console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
    });
  }

  updateKeyUp = () => {
    this.socket.emit("clientWriting");
  };

  handleSend = (messageToServer) => {
    const { discussion_id } = this.state;
    const json = {
      discussion_id,
      message: messageToServer,
    };

    this.socket.emit("clientSay", json, (message) => {
      try {
        this.videoCaptureRef.current.stopRecording();
        const blob = this.videoCaptureRef.current.getVideo();
        let formData = new FormData();
        formData.set("video", blob);
        formData.set("message_id", message.id);

        api
          .post(`/video`, formData, {
            headers: {
              "content-type": "multipart/form-data", // do not forget this
            },
          })
          .catch((e) => console.error(e));
      } catch (e) {
        console.log("Video did not start");
      }
    });
  };

  componentDidMount() {
    this.socket.on("start", (data) => {
      const { discussion_id } = data;
      this.setState({ discussion_id });

      const { messages } = this.state;
      messages.push(connectMessage());
      this.setState({ messages });
    });
    this.socket.on("clientSaid", (message) => {
      const { messages } = this.state;
      messages.push(message);
      this.setState({ messages, clientWriting: false });
    });

    this.socket.on("clientWriting", () => {
      this.setState({ clientWriting: true });

      if (this.clientInterval) {
        clearInterval(this.clientInterval);
      }

      this.clientInterval = setTimeout(() => {
        this.setState({ clientWriting: false });
      }, 2500);
    });

    this.socket.on("operatorSaid", (message) => {
      const { messages } = this.state;
      messages.push(message);
      this.setState({ 
        messages, 
        operatorWriting: false,
        audio: `${url}/${message.audio}`
      });

      try {
        this.videoCaptureRef.current.startRecording();
      } catch (e) {
        console.log("Cannot start video");
      }
    });

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
  }
 
  stopRecording = () => {
    this.setState({ record: false });
  }
 
  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }
 
  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }
 

  render() {
    const { messages, clientWriting, operatorWriting ,audio, record} = this.state;
    return (
      <Container>
        <Row>
          <Col>
          {audio && <audio src={audio} autoPlay={true} />}
            {/* <VideoCapture
              style={{ width: "300px" }}
              getRecording={this.getVideo}
              ref={this.videoCaptureRef}
            /> */}
            <ReactMic 
            record={record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            width="300"
            visualSetting="sinewave"
            />
            <br />
            <button 
            onMouseDown={this.startRecording} 
            onMouseUp={this.stopRecording}
            type="button"
            className="btn-primary">Speak</button>
          </Col>
          <Col>
            <ChatDiscussion
              messages={messages}
              clientWriting={clientWriting}
              operatorWriting={operatorWriting}
              handleClickOption={this.handleSend}
            />
            <ChatInput
              handleSend={this.handleSend}
              updateKeyUp={this.updateKeyUp}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
