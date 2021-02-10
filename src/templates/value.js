import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styles/meetup.scss";
import parse from "date-fns/parse"
import format from "date-fns/format"

import HeadshotPlaceholder from "../img/headshot-placeholder.svg";

class ValueTemplate extends Component {
  render() {
    return (
      <section
        className={`value  ${this.props.className && this.props.className}`}>
        <h2 className="value-title">{this.props.value.value_name}</h2>
        <div className="value-meta">
            <p>{this.props.value.value_desc}</p>
        </div>
        {/* <div className="meetup-presenters">
            
        </div> */}
      </section>
    );
  }
}

ValueTemplate.propTypes = {
  value: PropTypes.shape({
    value_name: PropTypes.string,
    value_desc: PropTypes.string,
  }),
};

export default ValueTemplate;
