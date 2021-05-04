import React, { Component } from "react";
import PropTypes from 'prop-types'

import ChatMessage from './ChatMessage.jsx'

import './ChatDiscussion.css'


export default class ChatDiscussion extends Component {

  constructor(props){
    super(props)
    this.messagesEndRef = React.createRef()
  }

  componentDidMount () {
    this.scrollToBottom()
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  render() {

    const { messages } = this.props
    return (
      <div className="mesgs">
        <div className="msg_history">
          {messages.map((message, i) => <ChatMessage key={i} {...message} />)}
          <div ref={this.messagesEndRef} />
        </div>
      </div>)
  }
}

ChatDiscussion.defaultProps = {
  messages: []
};
ChatDiscussion.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
}