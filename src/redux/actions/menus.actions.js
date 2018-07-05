import * as actionTypes from '../actionTypes';
import { store } from '../configureStore';


export const toggleMeal = (index, value, moment) => ({
  type: actionTypes.TOGGLE_MEAL,
  payload: { index, value, moment },
});

export const fetchMenuStarted = () => ({
  type: actionTypes.FETCH_MENU_STARTED, // TODO: decidere come influenza lo stato
});

export const fetchMenuSuccess = json => ({
  type: actionTypes.FETCH_MENU_SUCCESS,
  payload: { json },
});

export const fetchMenuFailure = error => ({
  type: actionTypes.FETCH_MENU_FAILURE, // todo: decidere come cambiare lo stato
  payload: { error },
});

export const postMenuStarted = () => ({
  type: actionTypes.POST_MENU_STARTED,
});

export const postMenuSuccess = () => ({
  type: actionTypes.POST_MENU_SUCCESS,
});

export const postMenuFailure = error => ({
  type: actionTypes.POST_MENU_FAILURE,
  payload: { error },
});

export const clearMessages = () => ({
  type: actionTypes.CLEAR_MESSAGES,
});

export const filterData = () => {

};


// ASYNC ACTIONS

const fetchMenu = () => {
  const URL = 'http://localhost:4000/meals';
  return fetch(URL, { method: 'GET' }).then(response => Promise.all([response, response.json()]));
};

export const fetchMenuRedux = () => (dispatch) => {
  dispatch(fetchMenuStarted());
  return fetchMenu().then(([response, json]) => {
    if (response.status === 200) {
      dispatch(fetchMenuSuccess(json));
    } else {
      dispatch(fetchMenuFailure(response.statusText));
    }
  });
};

const putMenu = () => {
  const URL = 'http://localhost:4000/meals';
  const { meals } = store.getState();
  const postConfig = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(meals),
  };
  return fetch(URL, postConfig).then(response => Promise.all([response]));
};

export const putMenuRedux = () => (dispatch) => {
  dispatch(postMenuStarted());
  return putMenu().then(([response]) => {
    console.log(response);
    if (response.ok === true) {
      console.log('sdkdsj');
      dispatch(postMenuSuccess());
    } else {
      dispatch(postMenuFailure(response.statusText));
    }
  });
};
