import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styles/meetup.scss";
import parse from "date-fns/parse"
import format from "date-fns/format"

import HeadshotPlaceholder from "../img/headshot-placeholder.svg";

class Value extends Component {
  render() {
    return (
      <section
        className={`meetup  ${this.props.className && this.props.className}`}>
        <h2 className="meetup-title">{this.props.value.title}</h2>
        <div className="meetup-meta">
            <p>{this.props.value.description}</p>
        </div>
        {/* <div className="meetup-presenters">
            
        </div> */}
      </section>
    );
  }
}

ValueTemplate.propTypes = {
  value: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default ValueTemplate;
