import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { PageHeader } from 'react-bootstrap';
import LoginForm from './LoginForm';
import Alert from '../../components/Alert';
import { clearMessages } from '../../redux/actions/authentication/authentication.actions';
import Loader from '../../components/Loader';


class LoginPage extends PureComponent {
  render() {
    const {
      error, closeAlert, isAuthenticated, isRehydrated, admin,
      // in futuro admin servirà per capire se l'user è admin
    } = this.props;
    if (!isRehydrated) return <Loader loading={!isRehydrated} />;
    // previene errori dovuti alla parziale idratazione del redux store
    return (
      <div className="row">
        <DocumentTitle title="Login" />
        <div className="col-md-4 col-md-offset-4">
          <PageHeader>
            Login
          </PageHeader>
          { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
          {console.log('Login admin?', isAuthenticated, admin)}
          { isAuthenticated && <Redirect to="/home" /> /* redirige se l'user è loggato */ }
          <LoginForm />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  error: PropTypes.string,
  isRehydrated: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  closeAlert: PropTypes.func.isRequired,
  admin: PropTypes.bool,
};

LoginPage.defaultProps = {
  error: '',
  isRehydrated: false,
  isAuthenticated: false,
  admin: false,
};

/* eslint-disable no-underscore-dangle */
const mapStateToProps = state => ({
  error: state.authentication.messages.error,
  admin: state.authentication.user.admin,
  isAuthenticated: state.authentication.isAuthenticated,
  isRehydrated: state._persist.rehydrated,
});


const mapDispatchToProps = dispatch => ({
  closeAlert: () => dispatch(clearMessages()),
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
