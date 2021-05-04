import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { io } from "socket.io-client";
import { url } from "../lib/api";
import { ChatDiscussion, ChatInput } from "../components/ChatDiscussion";

export default class Operator extends Component {
  state = {
    messages: [],
  };

  constructor(props) {
    super(props);

    this.socket = io(url);
    this.socket.on("connect", () => {
      console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
    });
    this.socket.on("start", () => {});
  }

  handleSend = (messageToServer) => {
    const json = {
      message: messageToServer,
    };
    this.socket.emit("operatorSay", json);
  };

  preparedMessage = (messageKey) => {
    const json = {
      key: messageKey,
      message: "What would you like to build",
      options: ["vila", "apartment"],
    };
    this.socket.emit("operatorSay", json);
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
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <ChatDiscussion messages={messages} />
            <ChatInput handleSend={this.handleSend} />
          </Col>
          <Col>
            <h3>Prepared messages</h3>
            <Button onClick={() => this.preparedMessage("what")}>
              What would you like to design?
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
