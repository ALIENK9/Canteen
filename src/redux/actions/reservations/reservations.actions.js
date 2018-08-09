import * as actionTypes from './reservations.actionTypes';
import Http from '../../Http';
import { getAuthFieldsFromStorage } from '../../utils';
import baseURLs from '../baseURLs';


export const fetchReservationsStarted = () => ({
  type: actionTypes.FETCH_RESERVATIONS_STARTED,
});

export const fetchReservationsSuccess = json => ({
  type: actionTypes.FETCH_RESERVATIONS_SUCCESS,
  payload: { json },
});

export const requestFailure = error => ({
  type: actionTypes.RESERVATION_REQUEST_FAILURE,
  payload: { error },
});

export const removeReservationSuccess = id => ({
  type: actionTypes.REMOVE_RESERVATION_SUCCESS,
  payload: { id },
});

export const addReservationSuccess = json => ({
  type: actionTypes.ADD_RESERVATION_SUCCESS,
  payload: { json },
});

export const removeReservationFailure = error => ({
  type: actionTypes.RESERVATION_ADD_REMOVE_FAILURE,
  payload: { error },
});

/* export const errorShow = error => ({
  type: actionTypes.ERROR_SHOW,
  payload: { error },
}); */

export const clearMessages = () => ({
  type: actionTypes.CLEAR_MESSAGES,
});

export const addModalShow = () => ({
  type: actionTypes.ADD_MODAL_SHOW,
});

export const addModalHide = () => ({
  type: actionTypes.ADD_MODAL_HIDE,
});

/**
 * Dispatched when getDayMeals and getUsers start
 */
export const loadFormDataStarted = () => ({
  type: actionTypes.LOAD_FORM_DATA_STARTED,
});

export const loadDayMealsSuccess = (json) => {
  console.log('daymeals reservati', json);
  return {
    type: actionTypes.LOAD_DAYMEALS_SUCCESS,
    payload: { json },
  };
};

export const loadDayMealsFailure = error => ({
  type: actionTypes.LOAD_DAYMEALS_FAILURE,
  payload: { error },
});

export const loadUsersSuccess = json => ({
  type: actionTypes.LOAD_USERS_SUCCESS,
  payload: { json },
});

export const loadUsersFailure = error => ({
  type: actionTypes.LOAD_USERS_FAILURE,
  payload: { error },
});

export const changeSelectedView = view => ({
  type: actionTypes.CHANGE_SELECTED_VIEW,
  payload: { view },
});

export const changeSelectedMoment = moment => ({
  type: actionTypes.CHANGE_SELECTED_MOMENT,
  payload: { moment },
});

export const filterMeals = filter => ({
  type: actionTypes.FILTER_MEALS,
  payload: { filter },
});

export const searchUser = text => ({
  type: actionTypes.SEARCH_USER,
  payload: { text },
});

// form error
export const hideErrorForm = () => ({
  type: actionTypes.HIDE_RESERVATION_ERROR_FORM,
});

// only show error (use operationFailure for more effects on data)
export const showErrorForm = error => ({
  type: actionTypes.SHOW_RESERVATION_ERROR_FORM,
  payload: { error },
});


// ASYNC ACTION

/* export const changeTab = (view, moment) => (dispatch) => {
  let URL = 'http://localhost:4000/';
  if (view === 'users') URL = URL.concat(moment === 'lunch' ? 'userLunch' : 'userDinner');
  else if (view === 'meals') URL = URL.concat(moment === 'lunch' ? 'mealsLunch' : 'mealsDinner');
  else URL = null;
  console.log(URL, moment, view);
  return Http.get(URL, dispatch, null, changeSelectedView, requestFailure);
}; */

export const getReservations = (mode, date, moment) => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  const URL = `${baseURLs.reservations}/${mode}`;
  const params = { date, moment };
  // const URL = 'http://localhost:4000/';
  // if (mode === 'users') URL = URL.concat(moment === 'lunch' ? 'userLunch' : 'userDinner');
  // else if (mode === 'meals') URL = URL.concat(moment === 'lunch' ? 'mealsLunch' : 'mealsDinner');
  // else URL = null;
  console.log('ISJIJISJDISJDISJDISJDIS', URL, moment, mode);
  return Http
    .get(URL, headers, params, dispatch, fetchReservationsStarted, fetchReservationsSuccess,
      requestFailure);
};

export const deleteReservation = id => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  const URL = `${baseURLs.reservations}/${id}`;
  // const URL = baseURL.concat(moment === 'lunch' ? 'userLunch/' : 'userDinner/').concat(`${id}`);
  return Http
    .delete(URL, headers, dispatch, fetchReservationsStarted,
      removeReservationSuccess.bind(this, id), removeReservationFailure);
};

export const getUserList = () => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  const URL = baseURLs.users;
  return Http
    .get(URL, headers, null, dispatch, loadFormDataStarted, loadUsersSuccess, loadUsersFailure);
};

export const getDayMenu = (date, moment) => async (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  const URL = baseURLs.menus;
  const params = { date };
  const menu = await Http.get(URL, headers, params, dispatch, loadFormDataStarted, null,
    loadDayMealsFailure);
  const correctData = menu && menu.data && menu.data[moment] || [];
  return dispatch(loadDayMealsSuccess(correctData));
};

export const postReservation = data => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  const baseURL = baseURLs.reservations;
  // const URL = baseURL.concat(moment === 'lunch' ? 'userLunch/' : 'userDinner/');
  return Http.post(baseURL, headers, dispatch, JSON.stringify(data), null, addReservationSuccess,
    showErrorForm);
};
