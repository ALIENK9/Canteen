import Http from '../../Http';
import * as actionTypes from './menus.actionTypes';
import { getAuthFieldsFromStorage } from '../../utils';
import baseURLs from '../baseURLs';

export const toggleMeal = (id, value, moment) => ({
  type: actionTypes.TOGGLE_MEAL,
  payload: { id, value, moment },
});

export const fetchMenuStarted = () => ({
  type: actionTypes.FETCH_MENU_STARTED, // TODO: decidere come influenza lo stato
});

export const fetchMenuSuccess = json => ({
  type: actionTypes.FETCH_MENU_SUCCESS,
  payload: { json },
});

export const fetchMenuFailure = error => ({
  type: actionTypes.FETCH_MENU_FAILURE,
  payload: { error },
});

export const postMenuStarted = () => ({
  type: actionTypes.POST_MENU_STARTED,
});

export const postMenuSuccess = () => ({
  type: actionTypes.POST_MENU_SUCCESS,
  payload: { success: 'Dati salvati correttamente' },
});

export const postMenuFailure = error => ({
  type: actionTypes.POST_MENU_FAILURE,
  payload: { error },
});

export const clearMessages = () => ({
  type: actionTypes.CLEAR_MESSAGES,
});

export const changeSelectedMoment = moment => ({
  type: actionTypes.CHANGE_SELECTED_MOMENT,
  payload: { moment },
});


export const filterMeals = filter => ({
  type: actionTypes.FILTER_MEALS,
  payload: { filter },
});


// ASYNC

export const getMenus = date => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  const params = { date };
  const URL = baseURLs.menus;
  return Http.get(URL, headers, params, dispatch, fetchMenuStarted, fetchMenuSuccess,
    fetchMenuFailure);
};

export const putMenus = meals => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  console.log('acction call data: ', meals, headers);
  const URL = baseURLs.menus;
  return Http.post(URL, headers, dispatch, JSON.stringify(meals),
    postMenuStarted, postMenuSuccess, postMenuFailure);
};
