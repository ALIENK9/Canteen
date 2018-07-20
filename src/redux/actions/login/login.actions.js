import jwt from 'jsonwebtoken';
import Http from '../../Http';
import * as actionTypes from './login.actionTypes';

export const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

export const loginSuccess = ({ token }) => {
  localStorage.setItem('authToken', token);
  console.log('Token in action', token);
  const auth = jwt.decode(token);
  console.log('Decoded token', auth);
  return ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: { auth },
  });
};

export const loginFailure = (error, json) => {
  console.log(json);
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: { error: json.message },
  };
};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: { user },
});


export const clearMessages = () => ({
  type: actionTypes.CLEAR_MESSAGES,
});


export const login = data => (dispatch) => {
  const URL = 'http://localhost:4000/admin/login';
  return Http.post(URL, dispatch, data, loginRequest, loginSuccess, loginFailure);
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(setCurrentUser({}));
};
