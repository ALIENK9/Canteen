import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ name, type }) => (
  <div className="card-container center">
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
  type: PropTypes.number.isRequired,
};

export default MenuItem;
