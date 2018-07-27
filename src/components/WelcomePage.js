import React from 'react';
import PropTypes from 'prop-types';


const WelcomePage = ({ username, welcomeText }) => (
  <div className="container">
    <div className="row">
      <div className="col">
        {username && (
        <React.Fragment>
          <h1 className="text-uppercase mb-0">
            Ciao,
            {' '}
            {username}
          </h1>
          <hr className="star-light" />
        </React.Fragment>
        )}
        <h2 className="font-weight-light mb-0">
          {welcomeText}
        </h2>
      </div>
    </div>
  </div>
);

WelcomePage.propTypes = {
  welcomeText: PropTypes.string,
  username: PropTypes.string,
};

WelcomePage.defaultProps = {
  welcomeText: '',
  username: '',
};

export default WelcomePage;
