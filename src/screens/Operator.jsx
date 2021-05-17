import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { io } from "socket.io-client";
import { url } from "../lib/api";
import { ChatDiscussion, ChatInput } from "../components/ChatDiscussion";


const connectMessage = () => {
  return {
    username: '',
    msg: JSON.stringify({message:'Client is connected'})
    
  }
}

export default class Operator extends Component {
  state = {
    messages: [],
    discussion_id: null,
    clientWriting:false,
    operatorWriting:false
  };

  constructor(props) {
    super(props);

    this.socket = io(url);
    this.socket.on("connect", () => {
      // console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
    });
    this.socket.on("start", () => {});
  }

  handleSend = (messageToServer) => {
    const {discussion_id} = this.state
    const json = {
      message: messageToServer,
      discussion_id
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


  updateKeyUp = () => {
    this.socket.emit("operatorWriting")
  }

  componentDidMount() {

    this.socket.on("start", (data) => {
      const {discussion_id} = data;
      this.setState({ discussion_id });
      
      const { messages } = this.state;
      messages.push(connectMessage());
      this.setState({ messages });
    });

    this.socket.on("clientSaid", (message) => {
      const { messages } = this.state;
      messages.push(message);
      this.setState({ messages,clientWriting:false });
    });

    this.socket.on("clientWriting", ()=>{
      this.setState({clientWriting:true})

      if (this.clientInterval) {
        clearInterval(this.clientInterval)
      }

      this.clientInterval = setTimeout(()=> {
        this.setState({clientWriting:false})
      }, 2500)
    })

    this.socket.on("operatorSaid", (message) => {
      const { messages } = this.state;
      messages.push(message);
      this.setState({ messages,operatorWriting:false });
    });

    this.socket.on("operatorWriting", ()=>{
      this.setState({operatorWriting:true})
      
      if (this.operatorInterval) {
        clearInterval(this.operatorInterval)
      }

      this.operatorInterval = setTimeout(()=> {
        this.setState({operatorWriting:false})
      }, 2500)
    })
  }

  render() {
    const { messages, clientWriting,operatorWriting } = this.state;

    return (
      <Container>
        <Row>
          <Col>
          <ChatDiscussion messages={messages} clientWriting={clientWriting} operatorWriting={operatorWriting} />
            <ChatInput handleSend={this.handleSend} updateKeyUp={this.updateKeyUp} />
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
