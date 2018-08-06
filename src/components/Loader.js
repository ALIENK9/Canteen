import React from 'react';
// import { PacmanLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import '../css/components/Loader.css';

// TODO: add this to every component
const Loader = ({ loading }) => (
  <React.Fragment>
    {loading && (
      <div className="loader-overlay">
        <div id="loader">
          Caricamento
        </div>
      </div>
    )}
  </React.Fragment>
);

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loader;
