import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Intro extends Component {
  render() {
    const { title, subtitle, abstract } = this.props.data;
    return (
      <div className="intro">
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <div className="intro__abstract">{abstract}</div>
      </div>
    );
  }
}

Intro.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Intro;
