import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default class ChatInput extends Component {
  state = {
    value: "",
  };

  handleSend = () => {
    const { handleSend } = this.props;
    const { value } = this.state;

    handleSend(value);

    this.setState({ value: "" });
  };

  handleKeyUp = (event) => {
    if (event.key === "Enter") {
      return this.handleSend();
    }
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      value,
    });
  };
  
  render() {
    const { value } = this.state;

    return (
      <div className="type_msg">
        <div className="input_msg_write">
          <input
            type="text"
            className="write_msg"
            placeholder="Type a message"
            value={value}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          />
          <button
            className="msg_send_btn"
            type="button"
            onClick={this.handleSend}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    );
  }
}

ChatInput.propTypes = {
  handleSend: PropTypes.func.isRequired,
};
