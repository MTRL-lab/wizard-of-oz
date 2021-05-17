import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import logo from './logo.png'

export default class ChatMessage extends Component {
  render() {
    const { username, img, msg, date, time } = this.props;

    const json = JSON.parse(msg);
    const incoming = username == "operator";
    const system = username == '';
    let content = "";

    if (json.key == 'clientWriting') {
      content = (
        <div className="dot-elastic"></div>
      );
    }
    else if (json.key == 'operatorWriting') {
      content = (
        <Fragment> <div className="dot-elastic"></div></Fragment>
      );
    }
    else if (json.key == "what") {
      content = (
        <Fragment>
          {json.message}
          {json.options.map((option, i) => (
            <button key={i}>{option}</button>
          ))}
        </Fragment>
      );
    } else if (json.message) {
      content = json.message;
    }

    if (incoming) {
      return (
        <div className="incoming_msg">
          <div className="incoming_msg_img">
            <img src={logo} alt={username} />
          </div>
          <div className="received_msg">
            <div className="received_withd_msg">
              <div className="wrapper">{content}</div>
              <span className="time_date">
                {time} | {date}
              </span>
            </div>
          </div>
        </div>
      );
    } 
    
    if (system) {
      return (
        <div className="system_msg">
             {content}
        </div>
      );
    }

    
      return (
        <div className="outgoing_msg">
          <div className="sent_msg">
            <div className="wrapper">{content}</div>
            <span className="time_date">
              {time} | {date}
            </span>
          </div>
        </div>
      );
    
  }
}

ChatMessage.propTypes = {
  username: PropTypes.string,
  img: PropTypes.string,
  msg: PropTypes.string.isRequired,
  date: PropTypes.string,
  time: PropTypes.string,
};
