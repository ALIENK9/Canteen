import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import {
  FormGroup, ControlLabel, FormControl, HelpBlock, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, clearMessages } from '../../redux/actions/login.actions';
import Alert from '../Alert';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* redirect() {
    // history.push('/menus');
  } */

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const { submitLogin } = this.props;
    event.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    submitLogin({ email, password });
  }

  render() {
    const { email, password, submitted } = this.state;
    const { authentication, error, closeAlert } = this.props;
    const { user, admin } = authentication;
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
        { admin && user && <Redirect to="/menus" /> /* redirige se l'admin è loggato */ }
        <fieldset>
          <legend>
            Dati dell&apos;account
          </legend>
          <FormGroup
            class="form-group"
            controlId="formEmail"
            validationState={authentication.error && 'error'}
          >
            <ControlLabel>
              Indirizzo e-mail
            </ControlLabel>
            <FormControl
              name="email"
              type="email"
              value={email}
              placeholder="holas@email.com"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            {submitted && !email && (
              <HelpBlock>
                L&apos;email è richiesta
              </HelpBlock>
            )}
          </FormGroup>
          <FormGroup
            class="form-group"
            controlId="formPassword"
          >
            <ControlLabel>
              Password
            </ControlLabel>
            <FormControl type="password" name="password" value={password} onChange={this.handleChange} />
            <FormControl.Feedback />
            {submitted && !password && (
            <HelpBlock>
              La password è richiesta
            </HelpBlock>
            )}
          </FormGroup>
          <Button className="login-submit" bsStyle="primary" type="submit">
              Accedi
          </Button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  submitLogin: data => dispatch(login(data)),
  closeAlert: () => dispatch(clearMessages()),
});

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
  authentication: PropTypes.shape({
    user: PropTypes.string,
    admin: PropTypes.bool,
  }),
  error: PropTypes.string,
};

Login.defaultProps = {
  authentication: {
    user: null,
    admin: false,
  },
  error: null,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

/* Vecchio router
  render() {
    return (
      <form onSubmit={() => this.redirect}>
        <div className="form-group">
          <label htmlFor="email">
  Email address:
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">
  Password:
          </label>
          <input type="password" className="form-control" id="pwd" />
        </div>
        <div className="form-group form-check">
          <label htmlFor="remember" className="form-check-label">
            {' '}
  Ricordami
            {' '}
          </label>
          <input id="remember" className="form-check-input" type="checkbox" />
        </div>
        <button type="submit" className="btn btn-primary">
  Submit
        </button>
      </form>
    );
  } */
