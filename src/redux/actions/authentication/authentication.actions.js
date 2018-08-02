import jwt from 'jsonwebtoken';
// import crypto from 'crypto-js';
import Http from '../../Http';
import * as actionTypes from './authentication.actionTypes';
import baseURLs from '../baseURLs';

export const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

export const loginFailure = (error, json) => {
  console.log(json);
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: {
      error: json ? json.message : error,
    },
  };
};

// HACK: magheggio bruttino per avere un'oggetto vuoto (però meno if)
const setCurrentUser = (userObject) => {
  const {
    token,
  } = userObject;
  console.log('Token in action', token);
  try {
    const decoded = jwt.decode(token); // HACK: RIMUOVERE TRY SE NON USO VERIFY
    const user = {
      ...decoded, // in realtà basta name, admin
      ...userObject, // dovrebbe contenere solo token
    };
    console.log('Decoded token', user);
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
  // const URL = 'http://localhost:4000/login';
  // const URL1 = 'http://192.168.30.102:9000/public/users/login';
  // const URL3 = 'http://192.168.30.102:9000/protected/current';
  // const URL2 = 'http://192.168.30.102:9000/public/users/test';
  // const URL = 'http://192.168.30.102:8700/protected-resource/hello';
  // const URL = 'http://192.168.30.102:8700/test';
  const { username, password } = data;
  console.log(`Dati: ${username}:${password}`);
  const headers = new Map().set('Authorization', `Basic ${btoa(`${username}:${password}`)}`)
    .set('Content-Type', 'application/json');
  /* const headers3 = new Map().set('Authorization',
    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYW0iLCJleHAiOjYxNdLDN5Ydwp1eNzjYQ0xkJ
    -WXkgGdZKYGoa1K5DFHZc-yvJc-jg'); */
  return Http.get(baseURLs.auth, headers, null, dispatch, loginRequest, setCurrentUser,
    loginFailure);
  /* const ciphertext = crypto.AES.encrypt('Pinocchio', 'chiavechiavechiavechiavechiaveaa');
  console.log('Critata', crypto.enc.Hex.parse(ciphertext));

  const bytes = crypto.AES.decrypt('8HMBhhBakSHO7sJ1Q9YVqA==', 'chiavechiavechiavechiavechiaveaa');
  const val = bytes.toString(crypto.enc.Utf16);
  console.log('La parola decriptatat', val); */
  // return Http.post(URL, dispatch, JSON.stringify(data1),
  // loginRequest, setCurrentUser, loginFailure);
}; // ora chiama setCurrentUser

export const logout = () => (dispatch) => { // dovrà fare il redirect
  dispatch(setCurrentUser({}));
};
