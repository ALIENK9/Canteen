import jwt from 'jsonwebtoken';
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
  // const URL = 'https://api-gateway-spring.herokuapp.com/getToken';
  // return Http.get(URL, null, dispatch, null, () => {}, () => {});
  const data = new FormData();
  data.append('grant_type', 'password');
  data.append('client_id', 'springdev');
  data.append('username', 'sam');
  data.append('password', 'asd');
  return Http.post(URL, dispatch, JSON.stringify(data1),
    loginRequest, setCurrentUser, loginFailure);
}; // ora chiama setCurrentUser

export const logout = () => (dispatch) => { // dovrà fare il redirect
  dispatch(setCurrentUser({}));
};
