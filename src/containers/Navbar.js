import React, { PureComponent } from 'react';
import { NavLink, withRouter, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import {
  Navbar as NavBar, NavItem, Nav,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { logout } from '../redux/actions/authentication/authentication.actions';

/**
 *
 * @param {String} linkName the name to be displayed in link
 * @param {Number} eventKey key to be fired with onChange event
 * @param {String} toPath href link path
 * @param {String} currentLocation current active path
 */
function createLink(linkName, eventKey, toPath, currentLocation) {
  console.debug('createLinkk', currentLocation, toPath);
  if (currentLocation === toPath) {
    return (
      <li className="active">
        <NavBar.Text>
          {linkName}
        </NavBar.Text>
      </li>
    );
  }
  return (
    <LinkContainer to={toPath}>
      <NavItem eventKey={eventKey}>
        {linkName}
      </NavItem>
    </LinkContainer>
  );
}

/**
 * Create a link item for bootstrap brand element. Return a static text element if link is active
 * @param {String} linkName link name to be displayed
 * @param {String} toPath href link prop
 * @param {String} currentLocation current location returned by router
 */
function brandLink(linkName, toPath, currentLocation) {
  if (currentLocation === toPath) {
    return (
      <NavBar.Text className="active">
        {linkName}
      </NavBar.Text>
    );
  }
  return (
    <NavLink to="/home">
      {linkName}
    </NavLink>
  );
}

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
    const { isAuthenticated, isAdmin, location } = this.props;
    const { redirectHome } = this.state;
    const { pathname: currentLocation } = location; // path in cui si trova l'utente

    // const guestLinks = ();

    const userLinks = (<NavItem />);

    const adminLinks = (
      <React.Fragment>
        {createLink('Gestione dei menù', 1, '/menus', currentLocation)}
        {createLink('Gestione prenotazioni', 2, '/reservations', currentLocation)}
        {createLink('Inserimento piatti', 3, '/dishes', currentLocation)}
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
            {brandLink('Home', '/home', currentLocation)}
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
  location: PropTypes.string.isRequired,
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
