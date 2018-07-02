import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ name }) => (
  <div>
    <span>
      {name}
    </span>
  </div>
);

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MenuItem;
