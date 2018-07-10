import React from 'react';
import PropTypes from 'prop-types';

const DishItem = ({ name, type, description }) => (
  <div className="w3-container w3-center">
    <div className="card-title">
      <strong>
        {name}
      </strong>
    </div>
    <div className="card-subtitle">
      {type}
    </div>
    <div className="card-content">
      <p>
        {description}
      </p>
    </div>
  </div>
);

DishItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string,
};

DishItem.defaultProps = {
  description: null,
};

export default DishItem;
