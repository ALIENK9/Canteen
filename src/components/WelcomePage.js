import React from 'react';
import PropTypes from 'prop-types';


const WelcomePage = ({ username, welcomeText, welcomeBottom }) => (
  <div className="container">
    <div className="row">
      <div className="col">
        {username && (
        <React.Fragment>
          <h1 className="text-uppercase mb-0">
            Ciao
            {' '}
            {username}
          </h1>
          <hr className="star-light" />
        </React.Fragment>
        )}
        {username ? (
          <h2 className="font-weight-light mb-0">
            {welcomeText}
          </h2>
        )
          : (
            <h1 className="font-weight-light mb-0">
              {welcomeText}
            </h1>
          )}
      </div>
    </div>
    {welcomeBottom}
  </div>
);

WelcomePage.propTypes = {
  welcomeText: PropTypes.string,
  username: PropTypes.string,
  welcomeBottom: PropTypes.node,
};

WelcomePage.defaultProps = {
  welcomeText: '',
  username: '',
  welcomeBottom: null,
};

export default WelcomePage;
