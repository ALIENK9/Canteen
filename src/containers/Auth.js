import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


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
    const { isAuthenticated: oldAuth, currentUserRole: oldRole } = oldProps;
    const { isAuthenticated: newAuth, currentUserRole: newRole } = this.props;
    if (oldAuth !== newAuth || oldRole !== newRole) this.ensureAuth(this.props);
  }


  ensureAuth(props) {
    const { isAuthenticated, requiredRole, currentUserRole } = props;
    if (!isAuthenticated) {
      this.redirect = '/login';
    } else if (!RequireRoleBase.hasRequiredRole(requiredRole, currentUserRole)) {
      this.redirect = '/forbidden';
    } else {
      this.redirect = null;
    }
    return true;
  }

  render() {
    const {
      /* isAuthenticated, */children, requiredRole, currentUserRole,
    } = this.props;
    if (!RequireRoleBase.hasRequiredRole(requiredRole, currentUserRole)) {
      return null;
    } // hack: propbabilmente si può migliorare la logica qui
    return ( // autenticato && ruolo giusto
      <div>
        {this.redirect && <Redirect to={this.redirect} />}
        {children}
      </div>
    );
  }
}

RequireRoleBase.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  requiredRole: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  currentUserRole: PropTypes.string,
};

RequireRoleBase.defaultProps = {
  requiredRole: '',
  currentUserRole: 'guest',
};

const mapStateToProps = (state) => {
  const authentication = state.authentication || {};
  let role = '';
  if (authentication.isAuthenticated) role = authentication.user.admin ? 'admin' : 'user';
  else role = 'guest';
  return {
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
