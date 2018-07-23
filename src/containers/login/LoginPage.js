import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import Alert from '../../components/Alert';
import { clearMessages } from '../../redux/actions/authentication/authentication.actions';


class LoginPage extends PureComponent {
  render() {
    const {
      error, closeAlert, isAuthenticated, admin, // in futuro servirà per capire se l'user è admin
    } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <h1>
            Login
          </h1>
          { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
          {console.log('Login admin?', isAuthenticated, admin)}
          { isAuthenticated && admin && <Redirect to="/home" /> /* redirige se l'admin è loggato */ }
          <LoginForm />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  error: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  closeAlert: PropTypes.func.isRequired,
  admin: PropTypes.bool,
};

LoginPage.defaultProps = {
  error: '',
  isAuthenticated: false,
  admin: false,
};

const mapStateToProps = state => ({
  error: state.authentication.messages.error,
  admin: state.authentication.user.admin,
  isAuthenticated: state.authentication.isAuthenticated,
});


const mapDispatchToProps = dispatch => ({
  closeAlert: () => dispatch(clearMessages()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
