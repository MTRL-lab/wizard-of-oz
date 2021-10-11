import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Redirect, withRouter, Link } from "react-router-dom";
import { Container, Col, Row, ListGroup, Badge, Card } from "react-bootstrap";
import ReactTags from "react-tag-autocomplete";

import api from "../lib/api.js"; //{ url }
import "./ChatLog.css";
// const videoStyle = {
//   width: "100%",
//   hight: "auto",
// };


const panelStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  height: "100%",
  left: 0,
  overflowY: "scroll",
};

const mainStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  height: "100%",
  right: 0,
  overflowY: "scroll",
};

class ChatLog extends Component {
  state = {
    groupedMessages: [],
    sessions: [],
    redirect: null,
    tags: {},
    suggestions: ["system message", "stupid", "question", "answer"],
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.reactTags = React.createRef();
  }

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
        this.setState({
          groupedMessages: this.groupMessagesWithVideo(result),
          messages: result.data,
        });

        return this.getTags(result.data);
      })
      .catch((error) => console.error(error));
  };

  getTags = (messages) => {
    const promises = messages.map((message) =>
      api
        .get("/tag", { params: { messageId: message.id } })
        .catch((error) => console.error(error))
    );

    const tags = {}
    return Promise.all(promises).then((results) => {
      results.map(result=>{
        if (result.data[0]){
          tags[result.data[0].messageId] = result.data
        }
       
      })
      this.setState({ tags });
    });
  };

  componentDidUpdate(previousProps) {
    if (previousProps.location.search === this.props.location.search) {
      return false;
    }

    const urlParams = new URLSearchParams(this.props.location.search);
    const discussion_id = urlParams.get("discussion_id");
    console.log(discussion_id);
    if (!discussion_id) return;
    this.getMessages(discussion_id);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);
    const discussion_id = urlParams.get("discussion_id");
    api
      .get("/sessions")
      .then((results) => this.setState({ sessions: results.data }))
      .catch((error) => console.error(error));

    if (!discussion_id) return;

    this.getMessages(discussion_id);
  }

  // onChange = (e) => {
  //   this.getMessages(e.target.value);
  // };

  onDelete(i, messageId) {
    const { tags } = this.state;
    api
      .delete("/tag", {
        name: tags[messageId][i],
        messageId,
      })
      .then(() => {
        // const tags = this.state.tags.slice(0);
        tags[messageId].splice(i, 1);
        this.setState({ tags });
      })
      .catch((error) => console.error(error));

    this.setState({ tags });
  }

  onAddition(tag, messageId) {
    let { tags } = this.state;

    if (!tags[messageId]) {
      tags[messageId] = [];
    }
    tags[messageId] = tags[messageId].concat(tag);
    api
      .post("/tag", {
        name: tag.name,
        messageId,
      })
      .then(() => {
        this.setState({ tags });
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { messages, sessions, redirect, tags, suggestions } = this.state;

    const suggestionsList = suggestions.map((name, id) => ({ name, id }));
    if (redirect) {
      return <Redirect to={`/chatlog/?discussion_id=${redirect}`} />;
    }
    
    return (
      <Container>
        <Row>
          <Col xs="3" style={panelStyle}>
            <ListGroup>
              {sessions.map((session, i) => {
                const date = moment(session.start);
                return (
                  <ListGroup.Item key={i} action>
                    <Link
                      to={`/chatlog/?discussion_id=${session.discussion_id}`}
                    >
                      {session.num} messages
                    </Link>
                    <Badge bg="success">{session.tags} tags</Badge>
                    <Badge bg="danger">{session.num - session.tags} todo</Badge>

                    <br />
                    <small>{date.format("DD/MM/YYYY")} </small>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col xs="9" style={mainStyle}>
            {messages &&
              messages.map((message) => {
                const json = JSON.parse(message.msg);
                //
                return (
                  <Card key={message.id} style={{ marginBottom: "10px" }}>
                    <Card.Body>
                      <Card.Text>
                        <Badge bg="success" style={{ float: "right" }}>
                          {message.username}
                        </Badge>
                        {`${json.message}`}
                      </Card.Text>

                      <ReactTags
                        placeholder=" "
                        // autocomplete={true}
                        minQueryLength={0}
                        autocomplete={true}
                        inline={true}
                        ref={this.reactTags}
                        tags={tags[message.id]}
                        suggestions={suggestionsList}
                        onDelete={(tagIndex) =>
                          this.onDelete(tagIndex, message.id)
                        }
                        onAddition={(tag) => this.onAddition(tag, message.id)}
                      ></ReactTags>
                    </Card.Body>
                  </Card>
                );
              })}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(ChatLog);
