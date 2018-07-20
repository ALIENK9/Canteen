import jwt from 'jsonwebtoken';
import Http from '../../Http';
import * as actionTypes from './login.actionTypes';

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

// HACK: magheggio bruttino per avere un'oggetto vuoto (però meno if)
const setCurrentUser = (userObject) => {
  const { token } = userObject;
  console.log('Token in action', token);
  const decoded = jwt.decode(token) || {};
  const user = {
    ...decoded,
    ...userObject, // contiene solo token
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


export const login = data => (dispatch) => {
  const URL = 'http://localhost:4000/admin/login';
  return Http.post(URL, dispatch, data, loginRequest, setCurrentUser, loginFailure);
}; // ora chiama setCurrentUser

export const logout = () => (dispatch) => { // dovrà fare il redirect
  localStorage.removeItem('token'); // non servirà più una volta appurato che persiste lo stato correttamente
  dispatch(setCurrentUser({}));
};
