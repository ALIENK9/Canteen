import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import Alert from '../../components/Alert';
import { clearMessages } from '../../redux/actions/login/login.actions';


class LoginPage extends PureComponent {
  render() {
    const {
      error, closeAlert, redirect, admin, // in futuro servirà per capire se l'user è admin
    } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
          { redirect && <Redirect to="/menus" /> /* redirige se l'admin è loggato */ }
          <LoginForm />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  error: PropTypes.string,
  redirect: PropTypes.bool,
  closeAlert: PropTypes.func.isRequired,
  admin: PropTypes.bool,
};

LoginPage.defaultProps = {
  error: '',
  redirect: false,
  admin: false,
};

const mapStateToProps = state => ({
  error: state.authentication.error,
  admin: state.authentication.admin,
  redirect: state.authentication.redirect,
});


const mapDispatchToProps = dispatch => ({
  closeAlert: () => dispatch(clearMessages()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
