import React, { Component } from "react";
import PropTypes from "prop-types";
import Webcam from "../react-webcam/react-webcam.js";

export default class VideoCapture extends Component {
  state = {
    videoUrl: null,
    recording: false,
  };

  constructor(props) {
    super(props);
    this.videoWebcam = React.createRef();
  }

  componentWillUnmount() {
    window.URL.revokeObjectURL(this.state.videoUrl);
  }

  startRecording = () => {
    this.videoWebcam.current.startRecording();
    this.setState({ recording: true });
  };

  stopRecording = () => {
    this.videoWebcam.current.stopRecording();
    const videoBlob = this.videoWebcam.current.getVideoBlob();
    const videoUrl = window.URL.createObjectURL(videoBlob);

    this.setState({ videoUrl , recording: false });
  };

  handleVideoError = (video) => {
    video.addEventListener(
      "error",
      (event) => {
        console.error("MediaRecording.recordedMedia.error()");
        console.log(
          "Your browser can not play " + video.src + "media clip. event:",
          event
        );
      },
      true
    );
  };

  onVideoLoaded = (video, callback) => {
    // workaround for non-seekable video taken from
    // https://bugs.chromium.org/p/chromium/issues/detail?id=642012#c23
    video.addEventListener("loadedmetadata", () => {
      if (video.duration === Infinity) {
        video.currentTime = 1e101;
        video.ontimeupdate = () => {
          video.currentTime = 0;
          video.ontimeupdate = () => {
            delete video.ontimeupdate;
            video.onloadeddata = callback;
          };
        };
      }
    });
  };

  getVideo = () => {
    return this.videoWebcam.current.getVideoBlob();
  };

  render() {
    const { style = {} } = this.props;
    return (
      <div className="videoContainer" style={style}>
        {this.state.recording ? "Recording" : "Not Recording"}
        <br />
        <Webcam audio={true} ref={this.videoWebcam} />
      
      </div>
    );
  }
}

VideoCapture.propTypes = {
  style: PropTypes.object,
};
