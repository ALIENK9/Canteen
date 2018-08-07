import React from 'react';
import PropTypes from 'prop-types';


const SmallSpinner = ({ loading }) => loading && (
  <span className="small-spinner-wrapper">
    <span className="fa fa-gear fa-spin small-spinner" />
  </span>
);

SmallSpinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default SmallSpinner;
