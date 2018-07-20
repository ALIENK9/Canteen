import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WelcomePage from '../components/WelcomePage';

const mapStateToProps = (state) => {
  const auth = state.authentication || {};
  let welcomeText = '';
  if (!auth.isAuthenticated) welcomeText = 'Benvenuto nel servizio mensa. Accedi per continuare';
  else if (auth.user.admin) welcomeText = 'Benvenuto nel pannello di admin';
  else welcomeText = 'Benvenuto nel serivio di prenotazione pasti';
  return {
    username: auth.user.name || null,
    welcomeText,
  };
};

export default withRouter(connect(mapStateToProps)(WelcomePage));
