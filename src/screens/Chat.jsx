import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { io } from "socket.io-client";
import api, { url } from "../lib/api";
import { ChatDiscussion, ChatInput } from "../components/ChatDiscussion";

import { VideoCapture } from "../components/VideoCapture";

export default class Chat extends Component {
  state = {
    messages: [],
  };

  constructor(props) {
    super(props);
    this.videoCaptureRef = React.createRef();

    this.socket = io(url);
    this.socket.on("connect", () => {
      console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
    });
  }

  handleSend = (messageToServer) => {
    const json = {
      message: messageToServer,
    };
    this.videoCaptureRef.current.stopRecording();
    const blob = this.videoCaptureRef.current.getVideo();
    this.socket.emit("clientSay", json, (message) => {
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
    });
  };

  componentDidMount() {
    this.socket.on("clientSaid", (message) => {
      const { messages } = this.state;
      messages.push(message);
      this.setState({ messages });
    });

    this.socket.on("operatorSaid", (message) => {
      const { messages } = this.state;
      messages.push(message);
      this.setState({ messages });

      this.videoCaptureRef.current.startRecording();
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <VideoCapture
              style={{ width: "300px" }}
              getRecording={this.getVideo}
              ref={this.videoCaptureRef}
            />
          </Col>
          <Col>
            <ChatDiscussion messages={messages} />
            <ChatInput handleSend={this.handleSend} />
          </Col>
        </Row>
      </Container>
    );
  }
}
