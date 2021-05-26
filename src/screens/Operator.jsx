import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { io } from "socket.io-client";
import { url } from "../lib/api";
import { ChatDiscussion, ChatInput } from "../components/ChatDiscussion";

const preparedStatements = [
  {
    message: "Hi, I'm Frank AI Wright, your expert architecture bot.",
  },
  {
    message: "How are feeling today?",
  },
];

const preparedQuestions = [
  {
    message: "What would you like to build?",
    options: ["villa", "apartment", "office", "residential addition"],
  },

  {
    message: "Where is the plot/apartment located?",
  },
  {
    message: "What do you do outside work?",
  },
  {
    message: "What are the challenges you currently face?",
  },
  {
    message: "What is your address?",
  },
  {
    message: "Who will use this space? (kids, elderly, tenants, etc.).",
  },
  {
    message: "What is your 5-year, 10-year and long-term plan for this space?",
  },
  {
    message:
      "What is the daily routine for the new space? What activities do you see yourself doing routinely?",
  },
  {
    message:
      "How much time do you spend in the different areas of your home (indoors and outdoors)?",
  },
  {
    message:
      "What is your lifestyle? Are you at home a great deal? Do you work at home?",
  },
  {
    message: "Do you entertain often? Describe the backyard.",
  },
  {
    message: "How concerned are you about privacy?",
  },
  {
    message:
      "Is there anyone in the family with a disability or who has mobility problems? (think long-term as well)",
  },
  {
    message: "Do you have any sustainability goals for the project?",
  },
  {
    message:
      "Are there any views on the site that are particularly important to you?",
  },
  {
    message: "What kind of ideas do you have for design or materials?",
  },
  {
    message:
      "Do you have any images from magazines or Pinterest that show us a style that you like?",
  },
  {
    message:
      "Are there any particular design features that are important to you?",
  },
  {
    message: "What style of architecture do you prefer?",
    options: [
      "Bauhaus",
      "Minimalism",
      "Deconstuctivism",
      "Post Modern",
      "Mediterranean",
      "Mid-Century Modern",
      "Modern",
      "Brutalism",

      "Spanish",
      "Southern",
      "Traditional",
      "Tuscan",
      "Victorian",
      "Rustic",
      "Gothic Architecture",
    ],
  },
  {
    message: "What kind of kitchen do you like?",
  },
  {
    message: "How many bedrooms do you want?",
  },
  {
    message: "How many bathrooms do you want?",
  },
  {
    message:
      "What kind of spaces are most important to you? (Bedrooms, kitchen, family room, bathrooms, etc.?)",
  },
  {
    message:
      "What storage needs do you have? (Bicycles, vacuum cleaners, camping gear etc.)",
  },
  {
    message: "Do you want a loft or second floor?",
  },
  {
    message: "Do you have any landscaping requirements?",
  },
  {
    message: "What are the time constraints of the project?",
  },
  {
    message: "What is your budget for the project?",
  },
];

const preparedAnswers = [
  {
    message: "I am sorry but I did not understand...",
  },
  {
    message: "I hope you feel better soon",
  },
  {
    message: "This is great.",
  },
  {
    message: "OK.",
  },
  {
    message: "I hope to visit there in the future.",
  },
];

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
