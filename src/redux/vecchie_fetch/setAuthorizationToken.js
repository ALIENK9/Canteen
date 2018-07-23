import FetchDefaults from './FetchDefaults';

/**
 * Set authorization header for fetch request
 * @param {String} token
 */
function setAuthorizationToken(token) {
  if (token) FetchDefaults.setFetch({ Authorization: `Bearer ${token}` });
  else FetchDefaults.setFetch({ Authorization: null });
}
