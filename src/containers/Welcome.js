import React from 'react';
import { connect } from 'react-redux';
import WelcomePage from '../components/WelcomePage';

const mapStateToProps = (state) => {
  const auth = state.authentication || {};
  let welcomeText = '';
  let welcomeBottom = null;
  if (!auth.isAuthenticated) {
    welcomeText = 'Benvenuto nel servizio mensa. Accedi per continuare';
    welcomeBottom = (<span className="welcome-page-blank" />);
  } else if (auth.user.admin) {
    welcomeText = 'Benvenuto nel pannello di admin';
    welcomeBottom = (
      <div className="row height90">
        <p>
          Da qui &egrave; possibile gestire i piatti, i men&ugrave; per ogni
          giornata e le prenotazioni
        </p>
        <span className="welcome-image" />
      </div>
    );
  } else {
    welcomeText = 'Benvenuto nel serivio di prenotazione pasti';
  }
  return {
    username: auth.user.name || null,
    welcomeText,
    welcomeBottom,
  };
};

export default connect(mapStateToProps)(WelcomePage);
