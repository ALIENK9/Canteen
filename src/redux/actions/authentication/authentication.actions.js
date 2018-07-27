import jwt from 'jsonwebtoken';
// import crypto from 'crypto-js';
import Http from '../../Http';
import * as actionTypes from './authentication.actionTypes';

export const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

/* TODO:
- usare solo setCurrentUser in modo da fare una cosa più pulita (QUASI FATTO)
- salvare anche il token in user (con setCurrentUser in modo da salvarlo
  automaticamente su sessionStorage ) (FATTO +o-: il server per ora manda tanta junk)
- far pescare il token alla fetch da sessionStorage (DA FARE. ATTENZIONE ALL'ANNIDAMENTO
  fatto da redux-persist)
- far reindirizzare alla home quando si fa il logout
*/
// @deprecated
/* export const loginSuccess = ({ token }) => {
  localStorage.setItem('authToken', token);
  console.log('Token in action', token);
  const auth = jwt.decode(token);
  console.log('Decoded token', auth);
  return ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: { auth },
  });
}; */

export const loginFailure = (error, json) => {
  console.log(json);
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: { error: json ? json.message : error },
  };
};

// HACK: magheggio bruttino per avere un'oggetto vuoto (però meno if)
const setCurrentUser = (userObject) => {
  const { token } = userObject;
  console.log('Token in action', token);
  const decoded = jwt.decode(token) || {};
  const user = {
    ...decoded,
    ...userObject, // dovrebbe contenere solo token
  };
  console.log('Decoded token', user);
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: { user },
  };
};


export const clearMessages = () => ({
  type: actionTypes.CLEAR_MESSAGES,
});


export const login = data1 => (dispatch) => {
  const URL = 'http://localhost:4000/login';
  // const URL = 'http://192.168.30.102:8700/getToken';
  // const URL = 'http://192.168.30.102:8700/protected-resource/hello';
  // const URL = 'http://192.168.30.102:8700/test';
  // return Http.get(URL, null, dispatch, null, setCurrentUser, loginFailure);
  /* const ciphertext = crypto.AES.encrypt('Pinocchio', 'chiavechiavechiavechiavechiaveaa');
  console.log('Critata', crypto.enc.Hex.parse(ciphertext));

  const bytes = crypto.AES.decrypt('8HMBhhBakSHO7sJ1Q9YVqA==', 'chiavechiavechiavechiavechiaveaa');
  const val = bytes.toString(crypto.enc.Utf16);
  console.log('La parola decriptatat', val); */
  return Http.post(URL, dispatch, JSON.stringify(data1),
    loginRequest, setCurrentUser, loginFailure);
}; // ora chiama setCurrentUser

export const logout = () => (dispatch) => { // dovrà fare il redirect
  dispatch(setCurrentUser({}));
};
