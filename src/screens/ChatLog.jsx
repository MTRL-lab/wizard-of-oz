import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { withRouter, Link } from "react-router-dom";
import { Container, Col, Row, Card } from "react-bootstrap";
import api, { url } from "../lib/api.js";
import { ChatMessage } from "../components/ChatDiscussion";


const videoStyle = {
    width: "100%",
    hight: "auto",
  };


class ChatLog extends Component {
  state = {
    groupedMessages: [],
    sessions: [],
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
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
  componentDidUpdate(previousProps) {

    if (previousProps.match.params.session_id === this.props.match.params.session_id) {
        return false
    }
    const session_id = this.props.match.params.session_id
    if (!session_id) return ;

    api
      .get("/messages",{params:{session_id}})
      .then((result) => this.groupMessagesWithVideo(result))
      .then((groupedMessages) => this.setState({ groupedMessages }))
      .catch((error) => console.error(error));console.log(3)
  }
  componentDidMount() {
    
    api
      .get("/sessions")
      .then((results) => this.setState({ sessions: results.data }))
      .catch((error) => console.error(error));

   
  }

  render() {
    const { groupedMessages, sessions } = this.state;

 
    return (
      <Container>
        <h1>Chat log</h1>
        <Row>
          <Col xs={groupedMessages.length ? 3 : 12 } >
            <h4>Session list</h4>
            {sessions.map((session, i) => {
              const date = moment(session.start);
              return (
                <Card key={i} style={{ marginBottom: "10px" }}>
                  <Card.Body>
                    <Card.Title>Session {i + 1}</Card.Title>
                    <Card.Subtitle></Card.Subtitle>
                    <Card.Text className="mb-2 text-muted">
                      {date.format("DD/MM/YYYY")} | {session.num} messages
                    </Card.Text>
                    <Link to={`/chatlog/${session.session_id}`}>
                      View session
                    </Link>
                  </Card.Body>
                </Card>
              );
              // <div>
              //     <a href={`?${session.session_id}`}>{session.session_id}</a>
              //     {session.num} messages
              //

              // </div>
            })}
          </Col>
          {groupedMessages.length && <Col xs="9">
            { groupedMessages.map((group, i) => {
              return (
                <Row key={i}>
                  <Col xs="6">
                    {group.video && (
                      <video style={videoStyle} controls>
                        <source
                          src={`${url}/uploads/video${group.video}.mp4`}
                          type="video/mp4"
                        />
                      </video>
                    )}
                  </Col>
                  <Col xs="6">
                    {group.messages.map((message, j) => (
                      <ChatMessage key={j} {...message} />
                    ))}
                  </Col>
                </Row>
              );
            })}
          </Col>}
        </Row>
      </Container>
    );
  }
}

export default withRouter(ChatLog)