import React, { Component,Fragment } from "react";
import PropTypes from "prop-types";
import { ReactMic } from "react-mic";

import CircularProgress from '@mui/material/CircularProgress';

const convertToBase64 = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      // strip data
      const base64result = reader.result.split(",")[1];
      resolve(base64result);
    };
  });
};

// Voice recorder

export default class VoiceInput extends Component {
  state = {
    record: false,
    sending: false,
  };

  startRecording = () => {
    this.setState({ record: true });
    console.log("start");
  };

  stopRecording = () => {
    this.setState({ record: false });
  };

  onStop = (recorded) => {
    const { handle } = this.props;

    this.setState({ sending: true });

    convertToBase64(recorded.blob)
      .then((base64) => handle(base64))
      .then(() => this.setState({ sending: false }));
  };

  render() {
    const { sending, record } = this.state;

    const recordStyle = record ? { background: "red" } : {};

    return (
      <Fragment>
        <div style={{ display: "none" }}>
          <ReactMic
            record={record}
            className="sound-wave"
            onStop={this.onStop}
            strokeColor="#000000"
            visualSetting="sinewave"
            echoCancellation={true} // defaults -> false
            autoGainControl={true} // defaults -> false
            noiseSuppression={true} // defaults -> false
          />
        </div>
        <button
          type="button"
          onMouseDown={this.startRecording}
          onMouseUp={this.stopRecording}
          style={recordStyle}
        >
          {sending ? (
            <CircularProgress />
          ) : (
            <FontAwesomeIcon icon={faMicrophone} />
          )}
        </button>
      </Fragment>
    );
  }
}

VoiceInput.propTypes = {
  sending: PropTypes.bool,
  record: PropTypes.bool,
  handle: PropTypes.func.isRequired,
};
