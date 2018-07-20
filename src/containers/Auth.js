import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../components/Loader/Loader';

/* eslint-disable react/no-unused-prop-types */
export class RequireRoleBase extends Component {
  static hasRequiredRole(requiredRole, currentUserRole) {
    let hasReqRole = false;
    if (Array.isArray(requiredRole)) {
      hasReqRole = !requiredRole || requiredRole.includes(currentUserRole);
    }
    hasReqRole = !requiredRole || requiredRole === currentUserRole;
    console.debug('Has correct role??', hasReqRole, requiredRole, currentUserRole);
    return hasReqRole;
  }

  constructor(props) {
    super(props);
    this.redirect = null;
  }

  componentDidMount() {
    this.ensureAuth(this.props);
  }

  componentDidUpdate(oldProps) {
    const { isAuthenticated: oldAuth, currentUserRole: oldRole, isRehydrated: oldr } = oldProps;
    const { isAuthenticated: newAuth, currentUserRole: newRole, isRehydrated: newr } = this.props;
    if (oldAuth !== newAuth || oldRole !== newRole || oldr !== newr) this.ensureAuth(this.props);
  }


  ensureAuth(props) {
    const {
      isAuthenticated, isRehydrated, requiredRole, currentUserRole,
    } = props;
    if (!isRehydrated) { // finchè lo stato non è settato non fa nulla
      return false;
    }
    if (!isAuthenticated) {
      this.redirect = '/login'; // non autenticato
    } else if (!RequireRoleBase.hasRequiredRole(requiredRole, currentUserRole)) {
      this.redirect = '/forbidden'; // autenticato ma non ha i permessi
    } else {
      this.redirect = null; // autenticato e con i permessi
    }
    return true;
  }

  render() {
    const {
      /* isAuthenticated, isRehydrated, requiredRole, currentUserRole, */ children, isRehydrated,
    } = this.props;
    /* if (!isRehydrated || !RequireRoleBase.hasRequiredRole(requiredRole, currentUserRole)) {
      return null;
    } */ // hack: propbabilmente si può migliorare la logica qui
    return ( // autenticato && ruolo giusto
      <div>
        <Loader loading={!isRehydrated} />
        {this.redirect && <Redirect to={this.redirect} />}
        {children}
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
const RequireRoleConnected = withRouter(connect(mapStateToProps)(RequireRoleBase));


export const RequireRole = (WrappedComponent, requireRoleProps = {}) => props => (
  <RequireRoleConnected {...requireRoleProps}>
    <WrappedComponent {...props} />
  </RequireRoleConnected>
);
