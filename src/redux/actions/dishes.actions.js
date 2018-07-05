import * as actionTypes from '../actionTypes';
import Http from '../Http';

export const addDish = dish => ({
  type: actionTypes.ADD_DISH,
  payload: { dish },
});


export const removeDish = id => ({
  type: actionTypes.REMOVE_DISH,
  payload: { id },
});

export const fetchDishesSuccess = json => ({
  type: actionTypes.FETCH_DISHES_SUCCESS,
  payload: { json },
});


export const requestFailure = error => ({
  type: actionTypes.DISH_REQUEST_FAILURE,
  payload: { error },
});


export const clearMessages = () => ({
  type: actionTypes.CLEAR_MESSAGES,
});

// ASYNC ACTIONS

export const getDishes = () => (dispatch) => {
  const URL = 'http://localhost:4000/dishes';
  return Http.get(URL, dispatch, null, fetchDishesSuccess, requestFailure);
};

export const deleteDish = id => (dispatch) => {
  const URL = `http://localhost:4000/dishes/${id}`;
  return Http.delete(URL, dispatch, null, removeDish.bind(this, id), requestFailure);
};
