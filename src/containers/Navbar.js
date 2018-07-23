import React, { PureComponent } from 'react';
import { NavLink, withRouter, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import {
  Navbar as NavBar, NavItem, Nav,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { logout } from '../redux/actions/authentication/authentication.actions';

class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.state = {
      redirectHome: false,
    };
  }

  onLogout(e) {
    e.preventDefault();
    const { onLogout } = this.props;
    onLogout();
    this.setState({ redirectHome: true });
  }

  render() {
    const { isAuthenticated, isAdmin } = this.props;
    const { redirectHome } = this.state;

    // const guestLinks = ();

    const userLinks = (<NavItem />);

    const adminLinks = (
      <React.Fragment>
        <LinkContainer to="/menus">
          <NavItem eventKey={1}>
            Menu
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/reservations">
          <NavItem eventKey={2}>
            Prenotazioni
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/dishes">
          <NavItem eventKey={3}>
            Inserimenti piatti
          </NavItem>
        </LinkContainer>
      </React.Fragment>
    );

    const logoutLink = (
      <NavItem eventKey={4} href="#" onClick={this.onLogout}>
        Logout
      </NavItem>
    );

    const loginLink = (
      <LinkContainer to="/login">
        <NavItem eventKey={4}>
            Login
        </NavItem>
      </LinkContainer>
    );

    return (
      <NavBar inverse collapseOnSelect>
        <NavBar.Header>
          <NavBar.Brand>
            <NavLink to="/home">
              Home
            </NavLink>
          </NavBar.Brand>
          <NavBar.Toggle />
        </NavBar.Header>
        <NavBar.Collapse>
          <Nav>
            {isAdmin ? adminLinks : userLinks}
          </Nav>
          <Nav pullRight>
            {isAuthenticated ? logoutLink : loginLink}
            {redirectHome && <Redirect to="/home" />}
          </Nav>
        </NavBar.Collapse>
      </NavBar>
    );
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  isAuthenticated: false,
  isAdmin: false,
};

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  isAdmin: state.authentication.user.admin,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
