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
    this.messagesEndRef.current.scrollIntoView({ alignToTop:true, behavior: 'smooth' })
  }

  render() {
    const { messages , clientWriting, operatorWriting, handleClickOption} = this.props
    return (
      <div className="messages">
        <ul>
          {messages.map((message, i) => <ChatMessage key={i} handleClickOption={handleClickOption} {...message} />)}
          {operatorWriting && <ChatMessage username="operator" msg={JSON.stringify({key:"operatorWriting"})} />}
          {clientWriting && <ChatMessage username="client" msg={JSON.stringify({key:"clientWriting"})} />}
          </ul>
          <div ref={this.messagesEndRef} />
      </div>)
  }
}

ChatDiscussion.defaultProps = {
  messages: []
};
ChatDiscussion.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  clientWriting: PropTypes.bool,
  operatorWriting: PropTypes.bool,
  handleClickOption: PropTypes.func,
  language: PropTypes.any

}