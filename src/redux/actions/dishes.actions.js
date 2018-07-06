import * as actionTypes from '../actionTypes';
import Http from '../Http';

export const addDishSuccess = dish => ({
  type: actionTypes.ADD_DISH_SUCCESS,
  payload: { dish },
});


export const removeDishSuccess = id => ({
  type: actionTypes.REMOVE_DISH_SUCCESS,
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

// DISH ADD FORM ACTIONS

export const showAddForm = () => ({
  type: actionTypes.SHOW_ADD_FORM,
});

export const hideAddForm = () => ({
  type: actionTypes.HIDE_ADD_FORM,
});

export const showErrorForm = error => ({
  type: actionTypes.SHOW_ERROR_FORM,
  payload: { error },
});

export const hideErrorForm = () => ({
  type: actionTypes.HIDE_ERROR_FORM,
});


// ASYNC ACTIONS

export const getDishes = () => (dispatch) => {
  const URL = 'http://localhost:4000/dishes';
  return Http.get(URL, dispatch, null, fetchDishesSuccess, requestFailure);
};

export const deleteDish = id => (dispatch) => {
  const URL = `http://localhost:4000/dishes/${id}`;
  return Http.delete(URL, dispatch, null, removeDishSuccess.bind(this, id), requestFailure);
};


export const postDish = dish => (dispatch) => {
  const URL = 'http://localhost:4000/dishes/ppp';
  return Http.post(URL, dispatch, dish, null, addDishSuccess, showErrorForm);
};
