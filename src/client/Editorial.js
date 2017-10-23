import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Editorial extends Component {
  render() {
    const { title, abstract } = this.props.data;
    return (
      <div className="editorial">
        <h2 className="editorial__title">{title}</h2>
        <div className="intro__abstract">{abstract}</div>
      </div>
    );
  }
}

Editorial.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Editorial;
