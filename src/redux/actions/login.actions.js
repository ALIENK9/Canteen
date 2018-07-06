import * as actionTypes from '../actionTypes';
import Http from '../Http';

export const loginRequest = data => ({
  type: actionTypes.LOGIN_REQUEST,
  payload: data,
});


export const loginSuccess = auth => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: { ...auth },
});

export const loginFailure = error => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: { error },
});

export const clearMessages = () => ({
  type: actionTypes.CLEAR_MESSAGES,
});


// ASYNC ACTIONS
export const login = data => (dispatch) => {
  // todo: fare opportuna GET
  // dispatch(loginFailure('Non valide'));
  // return Http.get(URL, dispatch, null, loginSuccess, loginFailure);
  dispatch(loginSuccess({
    user: 'Ciccio',
    admin: true,
  }));
};
