import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, FormGroup, ControlLabel, HelpBlock, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import validateLogin from '../../validation/login.validator';
import { login } from '../../redux/actions/login/login.actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateLogin(this.state);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { onLogin } = this.props;
    if (this.isValid()) {
      this.setState({ errors: {}, loading: true });
      const { identifier, password } = this.state;
      onLogin({ identifier, password });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value.trim() });
  }


  render() {
    const {
      errors, identifier, password,
    } = this.state;
    const { loading } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          className="form-group"
          controlId="formEmail"
          validationState={errors.identifier ? 'error' : null}
        >
          <ControlLabel>
            Indirizzo e-mail
          </ControlLabel>
          <FormControl
            name="identifier"
            type="email"
            value={identifier}
            placeholder="holas@email.com"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          {errors.identifier && (
          <HelpBlock>
            {errors.identifier}
          </HelpBlock>
          )}
        </FormGroup>
        <FormGroup
          className="form-group"
          controlId="formPassword"
          validationState={errors.password ? 'error' : null}
        >
          <ControlLabel>
            Password
          </ControlLabel>
          <FormControl type="password" name="password" value={password} onChange={this.handleChange} />
          <FormControl.Feedback />
          {errors.password && (
            <HelpBlock>
              {errors.password}
            </HelpBlock>
          )}
        </FormGroup>
        <Button className="login-submit" bsStyle="primary" type="submit" disabled={loading}>
          Accedi
        </Button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  loading: PropTypes.bool,
  onLogin: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  loading: true,
};

const mapStateToProps = state => ({
  loading: state.authentication.loading,
});

const mapDispatchToProps = dispatch => ({
  onLogin: state => dispatch(login(state)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
