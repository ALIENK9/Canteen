import jwt from 'jsonwebtoken';
import Http from '../../Http';
import * as actionTypes from './authentication.actionTypes';
import baseURLs from '../baseURLs';

export const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

export const loginFailure = (error, json) => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: {
    error: json ? json.message : error,
  },
});

export const setCurrentUser = (userObject) => {
  const {
    token,
  } = userObject;
  try {
    const decoded = jwt.decode(token);
    const user = {
      ...decoded, // in realtà basta name, admin
      ...userObject, // dovrebbe contenere solo token
    };
    return {
      type: actionTypes.SET_CURRENT_USER,
      payload: {
        user,
      },
    };
  } catch (err) {
    return {
      type: actionTypes.LOGIN_FAILURE,
      payload: { error: `Login fallito: token non valido ${err}` },
    };
  }
};


export const clearMessages = () => ({
  type: actionTypes.CLEAR_MESSAGES,
});


export const login = data => (dispatch) => {
  const { username, password } = data;
  const headers = new Map().set('Authorization', `Basic ${btoa(`${username}:${password}`)}`)
    .set('Content-Type', 'application/json');
  return Http.get(baseURLs.auth, headers, null, dispatch, loginRequest, setCurrentUser,
    loginFailure);
}; // ora chiama setCurrentUser

export const logout = () => (dispatch) => { // dovrà fare il redirect
  dispatch(setCurrentUser({}));
};
