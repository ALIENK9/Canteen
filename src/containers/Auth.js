import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../components/Loader/Loader';


export class RequireRoleBase extends Component {
  /**
   * Utility to check if user role corresponds to required role
   * @param {String|Array<String>} requiredRole Required role or array with 'admin' | 'user'
   * @param {String} currentUserRole The current user role
   */
  static hasRequiredRole(requiredRole, currentUserRole) {
    let hasReqRole = false;
    if (Array.isArray(requiredRole)) { // array di stringhe ruoli adatti
      hasReqRole = !requiredRole || requiredRole.includes(currentUserRole);
    } else { // stringa semplice
      hasReqRole = !requiredRole || requiredRole === currentUserRole;
    }
    console.debug('Has correct role??', hasReqRole, requiredRole, currentUserRole);
    return hasReqRole;
  }

  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
  }

  componentDidMount() {
    this.ensureAuth(this.props);
  }

  componentDidUpdate(oldProps) {
    const {
      isAuthenticated: oldAuth, requiredRole: orr, currentUserRole: oldRole, isRehydrated: oldr,
    } = oldProps;
    const {
      isAuthenticated: newAuth, requiredRole: nrr, currentUserRole: newRole, isRehydrated: newr,
    } = this.props;
    if (oldAuth !== newAuth || orr !== nrr || oldRole !== newRole || oldr !== newr) {
      this.ensureAuth(this.props);
    }
  }

  /**
   * Check if props allow user to access the wrapped component. If not sets
   * state.redirect to redirect location.
   * @param {Object} props { isAuthenticated, isRehydrated, requiredRole, currentUserRole }
   */
  ensureAuth(props) {
    const {
      isAuthenticated, isRehydrated, requiredRole, currentUserRole,
    } = props;
    console.debug('ensureAuth', 'IsAuth', isAuthenticated, 'IsRehydrated', isRehydrated, 'reqRole', requiredRole, 'currentRole', currentUserRole);
    if (!isRehydrated) { // finchè lo stato non è settato non fa nulla
      return;
    }
    if (!isAuthenticated) {
      console.debug('!!!!!!!!!!isAuthenticated');
      this.setState({ redirect: '/login' }); // non autenticato
    } else if (!RequireRoleBase.hasRequiredRole(requiredRole, currentUserRole)) {
      console.debug('!!!!!!!!!!giustoRole');
      this.setState({ redirect: '/forbidden' }); // autenticato ma non ha i permessi
    } else {
      console.debug('Ruolo giuto');
      this.setState({ redirect: null }); // autenticato e con i permessi
    }
  }

  render() {
    const {
      /* isAuthenticated, isRehydrated, requiredRole, currentUserRole, */ children, isRehydrated,
    } = this.props;
    const { redirect } = this.state;
    /* if (!isRehydrated || !RequireRoleBase.hasRequiredRole(requiredRole, currentUserRole)) {
      return null;
    } */ // hack: propbabilmente si può migliorare la logica qui
    if (!redirect) {
      console.debug('NOT REDIRECT: ', redirect);
      return (
        <div>
          <Loader loading={!isRehydrated} />
          {children}
        </div>
      );
    }
    console.debug('REDIRECT: ', redirect);
    return (
      <div>
        <Loader loading={!isRehydrated} />
        <Redirect to={redirect} />
      </div>
    );
  }
}

RequireRoleBase.propTypes = {
  children: PropTypes.node.isRequired,
  isRehydrated: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  requiredRole: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  currentUserRole: PropTypes.string,
};

RequireRoleBase.defaultProps = {
  isRehydrated: false,
  requiredRole: '',
  currentUserRole: 'guest',
};

/* eslint-disable no-underscore-dangle */
const mapStateToProps = (state) => {
  const authentication = state.authentication || {};
  let role = '';
  if (authentication.isAuthenticated) role = authentication.user.admin ? 'admin' : 'user';
  else role = 'guest';
  return {
    isRehydrated: state._persist.rehydrated,
    isAuthenticated: authentication.isAuthenticated,
    currentUserRole: role,
  };
};
const RequireRoleConnected = connect(mapStateToProps)(RequireRoleBase);

/**
 * Render provided Component if logged user role match requiredRole(s).
 * If user is not logged redirects in /login route. If user is logged but is not authorised
 * it redirects in /forbidden route.
 * @param {Component} WrappedComponent React Component to be rendered
 * @param {Object} requireRoleProps Object with { requiredRole: 'admin'|'user' }
 *  or with array of strings { requiredRole: ['admin', 'user'] }
 */
export const RequireRole = (WrappedComponent, requireRoleProps = {}) => props => (
  <RequireRoleConnected {...requireRoleProps}>
    <WrappedComponent {...props} />
  </RequireRoleConnected>
);
