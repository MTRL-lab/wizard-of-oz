import React, { Component } from "react";
import { io } from "socket.io-client";
import { url } from "../lib/api";
import { ChatDiscussion, ChatInput } from "../components/ChatDiscussion";
import { ChatWrapper } from "../components/ChatWrapper";
import PropTypes from "prop-types";

class Panel extends Component {
  render (){
    const {onClick, prepared} = this.props;

    return <div className="questions">
      <ul>
      {prepared.map((question, key) => (
        <li
          key={key}
          onClick={() => onClick(question)}
        >
          {question.message}
        </li>
      ))}
      </ul>
    </div>
  }
}

Panel.propTypes = {
  onClick: PropTypes.func,
  prepared: PropTypes.array
};



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
    language:null,
    prepared: []
  };

  constructor(props) {
    super(props);

    this.socket = io(url);
    this.socket.on("connect", () => {
      // console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
    });
  }

  handleSend = (message) => {
    const { discussion_id, language } = this.state;
    const json = {
      message,
      discussion_id,
      language
    };
    this.socket.emit("operatorSay", json);
  };

  preparedMessage = (message) => {
    const { discussion_id,language } = this.state;
    message.discussion_id = discussion_id;
    message.language = language
    this.socket.emit("operatorSay", message);
  }

  updateKeyUp = () => {
    this.socket.emit("operatorWriting");
  };

  componentDidMount() {
    this.socket.on("start", (data) => {
      const { messages } = this.state;

      const { discussion_id,language } = data;
      messages.push(connectMessage());

      const {
        preparedStatements,
        errors,
        preparedQuestions,
      // eslint-disable-next-line no-undef
      } = require(`../preparedStatements_${language}.json`);

      const prepared = preparedStatements.concat(preparedQuestions).concat(errors)
      this.setState({ messages,discussion_id,prepared,language });
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
    const { messages, clientWriting, operatorWriting, discussion_id, prepared } =
      this.state;

      
    return (
        <ChatWrapper panel= {<Panel prepared={prepared} onClick={this.preparedMessage}/>}>
          <div className="contact-profile">
            <p>Client</p>
          </div>
          <ChatDiscussion
            messages={messages}
            clientWriting={clientWriting}
            operatorWriting={operatorWriting}
            handleClickOption={this.handleSend}
          />
          <div className="message-input">
            <div className="wrap">
              {discussion_id && (
                <ChatInput
                  handleSend={this.handleSend}
                  updateKeyUp={this.updateKeyUp}
                />
              )}
              {!discussion_id && "No discussion ID"}
            </div>
          </div>
        </ChatWrapper>
    );
  }
}
