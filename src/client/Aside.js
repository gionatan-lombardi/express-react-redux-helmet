import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Aside extends Component {
  render() {
    const { title, ['image-src']: imageSrc } = this.props.data;
    return (
      <aside className="aside">
        <div className="aside__title">{title}</div>
        <img src={imageSrc} alt="Dummy Image" />
        <p>Cippo</p>
      </aside>
    );
  }
}

Aside.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Aside;
