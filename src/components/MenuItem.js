import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ name, type }) => (
  <div className="w3-container w3-center">
    <strong>
      {name}
    </strong>
    <div className="card-subtitle">
      {type}
    </div>
  </div>
);

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MenuItem;
