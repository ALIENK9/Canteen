import * as actionTypes from './dishes.actionsTypes';
import Http from '../../Http';

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

// DISH FILTER ACTIONS

export const filterMeals = filter => ({
  type: actionTypes.FILTER_MEALS,
  payload: { filter },
});

// DISH ADD FORM ACTIONS

export const showAddForm = () => ({
  type: actionTypes.SHOW_ADD_DISH_FORM,
});

export const hideAddForm = () => ({
  type: actionTypes.HIDE_ADD_DISH_FORM,
});

export const showErrorForm = error => ({
  type: actionTypes.SHOW_DISH_ERROR_FORM,
  payload: { error },
});

export const hideErrorForm = () => ({
  type: actionTypes.HIDE_DISH_ERROR_FORM,
});


// ASYNC ACTIONS

export const getDishes = () => (dispatch) => {
  // const URL = 'http://localhost:4000/dishes';
  const URL = 'https://api-gateway-spring.herokuapp.com/test';
  return Http.get(URL, null, dispatch, null, fetchDishesSuccess, requestFailure);
};

export const deleteDish = id => (dispatch) => {
  const URL = `http://localhost:4000/dishes/${id}`;
  console.debug('URL DELTEE: ', URL);
  return Http.delete(URL, dispatch, null, removeDishSuccess.bind(this, id), requestFailure);
};


export const postDish = dish => (dispatch) => {
  const URL = 'http://localhost:4000/dishes'; // todo: dovrei inserire nell'oggetto in memori anche l'ID
  return Http.post(URL, dispatch, JSON.stringify(dish), null, addDishSuccess, showErrorForm);
};
