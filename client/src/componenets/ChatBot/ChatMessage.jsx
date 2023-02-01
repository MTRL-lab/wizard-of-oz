import React, { Component } from "react";
import PropTypes from "prop-types";
import CircularProgress from '@mui/material/CircularProgress';
import logo from "../../assets/img/logo.png";

// eslint-disable-next-line no-undef
const imagesPath = process.env.REACT_APP_SERVER_MEDIA

export default class ChatMessage extends Component {

    handleClickOption = (text) => {
        const { handleClickOption } = this.props;
        handleClickOption(text);
    };

    render() {
        const { username, msg } = this.props;
        const json = JSON.parse(msg);
        const outgoing = username == "client";
        const system = username == "";
        let content = "";

        const direction = json.language == 'he-IL' || json.language == 'ar-XA' ? 'rtl' :'ltr'
        const textAlign = direction == 'rtl' ? 'right' : 'left'

        if (json.key == "clientWriting") {
            content = <CircularProgress />;
        }

        else if (json.key == "operatorWriting") {
            content = <CircularProgress />;
        }

        else if (json.message) {
            if (json.options) {
                content = (
                    <>

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
                    </>
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
                    <p className="system_msg">
                        {content}
                    </p>
                </li>
            );
        }

        return (
            <li className="replies">
                <img src={logo} alt={username} className="avatar" />
                
                <p style={{direction, textAlign}}>
                {json.img && <img className="design" src={`${imagesPath}${json.img}`} alt="design" />}

                {json.imgs && json.imgs.map((i,key)=><img key={key} className="design" src={`${imagesPath}${i}`} alt="design" />)}

                    {content}
                </p>
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
