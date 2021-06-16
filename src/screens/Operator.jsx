import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { io } from "socket.io-client";
import { url } from "../lib/api";
import { ChatDiscussion, ChatInput } from "../components/ChatDiscussion";
import {preparedStatements,preparedAnswers, preparedQuestions} from '../preparedStatements.json'



const connectMessage = () => {
  return {
    username: "",
    msg: JSON.stringify({ message: "Client is connected" }),
  };
};

export default class Operator extends Component {
  state = {
    messages: [],
    discussion_id: null,
    clientWriting: false,
    operatorWriting: false,
  };

  constructor(props) {
    super(props);

    this.socket = io(url);
    this.socket.on("connect", () => {
      // console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
    });
    this.socket.on("start", () => {});
  }

  handleSend = (message) => {
    const { discussion_id } = this.state;
    const json = {
      message,
      discussion_id,
    };
    this.socket.emit("operatorSay", json);
  };

  preparedMessage = (message) => {
    const { discussion_id } = this.state;
    message.discussion_id = discussion_id;
    this.socket.emit("operatorSay", message);
  };

  updateKeyUp = () => {
    this.socket.emit("operatorWriting");
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
      this.setState({ messages, operatorWriting: false });
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
  }

  render() {
    const { messages, clientWriting, operatorWriting, discussion_id } =
      this.state;

    return (
      <Container>
        <Row>
          <Col>
            <ChatDiscussion
              messages={messages}
              clientWriting={clientWriting}
              operatorWriting={operatorWriting}
              handleClickOption={this.handleSend}
            />
            {discussion_id && (
              <ChatInput
                handleSend={this.handleSend}
                updateKeyUp={this.updateKeyUp}
              />
            )}
            {!discussion_id && "No discussion ID"}
          </Col>
          <Col>
            <h3>Prepared statements</h3>
            <ul className="list-group">
              {preparedStatements.map((question, key) => (
                <li
                  className="list-group-item"
                  key={key}
                  onClick={() => this.preparedMessage(question)}
                >
                  {question.message}
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            <h3>Prepared questions</h3>
            <ul className="list-group">
              {preparedQuestions.map((question, key) => (
                <li
                  className="list-group-item"
                  key={key}
                  onClick={() => this.preparedMessage(question)}
                >
                  {question.message}
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            <h3>Prepared answers</h3>
            <ul className="list-group">
              {preparedAnswers.map((question, key) => (
                <li
                  className="list-group-item"
                  key={key}
                  onClick={() => this.preparedMessage(question)}
                >
                  {question.message}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}
