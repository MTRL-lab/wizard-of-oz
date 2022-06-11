import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import logo from "./logo.png";


export default class ChatMessage extends Component {
    handleClickOption = (text) => {
        const { handleClickOption } = this.props;
        handleClickOption(text);
    };
    render() {
        const { username, img, msg } = this.props;

        const json = JSON.parse(msg);
        const outgoing = username == "client";
        const system = username == "";
        let content = "";

        if (json.key == "clientWriting") {
            content = <FontAwesomeIcon icon={faSpinner} spin={true} />;
        } else if (json.key == "operatorWriting") {
            content = <FontAwesomeIcon icon={faSpinner} spin={true} />;
        } else if (json.message) {
            if (json.options) {
                content = (
                    <Fragment>
                        {json.message}
                        {json.options.map((option, i) => (
                            <button
                                className="btn btn-primary"
                                onClick={() => this.handleClickOption(option)}
                                key={i}
                            >
                                {option}
                            </button>
                        ))}
                    </Fragment>
                );
            } else {
                content = json.message;
            }
        }

        if (outgoing) {
            return (
                <li className="sent">
                    <p>{content}</p>
                </li>
            );
        }

        if (system) {
            return (
                <li>
                    <p className="system_msg">{content}</p>
                </li>
            );
        }

        return (
            <li className="replies">
                <img src={logo} alt={username} />
                <p>{content}</p>
            </li>
        );
    }
}

ChatMessage.propTypes = {
    username: PropTypes.string,
    img: PropTypes.string,
    msg: PropTypes.string.isRequired,
    date: PropTypes.string,
    time: PropTypes.string,
    handleClickOption: PropTypes.func,
};
