import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ChatWrapper.css";

export default class ChatWrapper extends Component {

  render() {
    const { children, panel } = this.props;
    const className = panel ? "chat panel" : "chat";


    return (

        <div className="wrapper">
          <div className={className}>
            {panel && <div className="sidepanel">{panel}</div>}
            <div className="content">
              {children}
              </div>
          </div>
        </div>
    );
  }
}
ChatWrapper.propTypes = {
  children: PropTypes.node,
  panel: PropTypes.node,
};
