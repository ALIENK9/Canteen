import * as actionTypes from './dishes.actionsTypes';
import Http from '../../Http';
import { getAuthFieldsFromStorage } from '../../utils';
import baseURLs from '../baseURLs';

export const addDishSuccess = dish => ({
  type: actionTypes.ADD_DISH_SUCCESS,
  payload: { dish },
});

export const addDishStarted = () => ({
  type: actionTypes.DISH_ADD_STARTED,
});

export const removeDishStarted = () => ({
  type: actionTypes.DISH_REMOVE_STARTED,
});

export const removeDishSuccess = id => ({
  type: actionTypes.REMOVE_DISH_SUCCESS,
  payload: { id },
});

export const removeDishFailure = error => ({
  type: actionTypes.DISH_ADD_REMOVE_FAILURE,
  payload: { error },
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


export const fetchDishesStarted = () => ({
  type: actionTypes.FETCH_DISHES_STARTED,
});


// DISH FILTER ACTIONS

export const filterMeals = filter => ({
  type: actionTypes.FILTER_MEALS,
  payload: { filter },
});

export const searchDish = text => ({
  type: actionTypes.SEARCH_DISH,
  payload: { text },
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
  const headers = getAuthFieldsFromStorage(); // Map
  const URL = baseURLs.dishes;
  return Http.get(URL, headers, null, dispatch, fetchDishesStarted,
    fetchDishesSuccess, requestFailure);
};

export const deleteDish = id => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  const URL = `${baseURLs.dishes}/${id}`;
  console.debug('URL DELTEE: ', URL);
  return Http
    .delete(URL, headers, dispatch, removeDishStarted, removeDishSuccess.bind(this, id),
      removeDishFailure);
};


export const postDish = dish => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  const URL = baseURLs.dishes;
  return Http
    .post(URL, headers, dispatch, JSON.stringify(dish), addDishStarted, addDishSuccess,
      showErrorForm);
};
