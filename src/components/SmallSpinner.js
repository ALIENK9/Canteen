import React from 'react';
import PropTypes from 'prop-types';


const SmallSpinner = ({ loading, className }) => loading && (
  <span className={`${className} small-spinner-wrapper`}>
    <span className="fa fa-gear fa-spin small-spinner" />
  </span>
);

SmallSpinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

SmallSpinner.defaultProps = {
  className: '',
};

export default SmallSpinner;
