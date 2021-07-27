import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Redirect, withRouter } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import api from "../lib/api.js"; //{ url }
import { ChatDiscussion } from "../components/ChatDiscussion";
import { ChatWrapper } from "../components/ChatWrapper";

import logo from "./../components/ChatDiscussion/logo.png";

// const videoStyle = {
//   width: "100%",
//   hight: "auto",
// };

class ChatLog extends Component {
  state = {
    groupedMessages: [],
    sessions: [],
    redirect: null,
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  // group all the messages that belong to one video
  // videos are identified by the client's response id
  groupMessagesWithVideo = (result) => {
    const messages = result.data;

    const groupedMessages = [];

    let i = 0;

    messages.forEach((message) => {
      // init bucket
      if (!groupedMessages[i]) groupedMessages[i] = { messages: [] };

      groupedMessages[i].messages.push(message);

      // if client, than start new bucket
      if (message.username === "client") {
        groupedMessages[i].video = message.id;
        i++;
      }
    });

    return groupedMessages;
  };
  getMessages = (discussion_id) => {
    api
      .get("/messages", { params: { discussion_id } })
      .then((result) => {
        this.setState({ messages: result.data })
        return this.groupMessagesWithVideo(result)
      })
      .then((groupedMessages) => this.setState({ groupedMessages }))
      .catch((error) => console.error(error));
  };
  componentDidUpdate(previousProps) {
    if (
      previousProps.match.params.discussion_id ===
      this.props.match.params.discussion_id
    ) {
      return false;
    }
    const discussion_id = this.props.match.params.discussion_id;
    if (!discussion_id) return;

    this.getMessages(discussion_id);
  }
  componentDidMount() {
    const discussion_id = this.props.match.params.discussion_id;
    api
      .get("/sessions")
      .then((results) => this.setState({ sessions: results.data }))
      .catch((error) => console.error(error));

    if (!discussion_id) return;

    this.getMessages(discussion_id);
  }

  onChange = (e) => {
    this.getMessages(e.target.value);
  };

  render() {
    const { groupedMessages, messages, sessions, redirect } = this.state;

    if (redirect) {
      return <Redirect to={`/chatlog/?discussion_id=${redirect}`} />;
    }
    return (
      <Container>
        <h1>Chat log</h1>

        <Row>
          <Col xs={groupedMessages.length ? 3 : 12}>
            <h4>Session list</h4>
            <select onChange={this.onChange}>
              {sessions.map((session, i) => {
                const date = moment(session.start);
                return (
                  <option key={i} value={session.discussion_id}>
                    {session.discussion_id} |{date.format("DD/MM/YYYY")} |{" "}
                    {session.num} messages
                  </option>
                );
              })}
            </select>
          </Col>
          <Col xs="9">
            <ChatWrapper>
              <div className="contact-profile">
                <img src={logo} alt="" />
                <p>Architecture bot</p>
              </div>
              <ChatDiscussion
                messages={messages}
                clientWriting={false}
                operatorWriting={false}
              />
            </ChatWrapper>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(ChatLog);
