import React from 'react';
import PropTypes from 'prop-types';

// TODO: add this to every component
const Loader = ({ loading }) => (
  <React.Fragment>
    {loading && (
      <div className="loader-overlay">
        <div id="loader">
          Caricamento
          {/* per accessibilità */}
        </div>
      </div>
    )}
  </React.Fragment>
);

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loader;
