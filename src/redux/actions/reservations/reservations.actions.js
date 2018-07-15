import * as actionTypes from './reservations.actionTypes';
import Http from '../../Http';


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

export const loadDayMealsSuccess = json => ({
  type: actionTypes.LOAD_DAYMEALS_SUCCESS,
  payload: { json },
});

export const loadDayMealsFailure = error => ({
  type: actionTypes.LOAD_DAYMEALS_FAILURE,
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

/* export const hideErrorForm = () => ({
  type: actionTypes.HIDE_RESERVATION_ERROR_FORM,
});

export const showErrorForm = error => ({
  type: actionTypes.SHOW_RESERVATION_ERROR_FORM,
  payload: { error },
}); */


// ASYNC ACTION

/* export const changeTab = (view, moment) => (dispatch) => {
  let URL = 'http://localhost:4000/';
  if (view === 'users') URL = URL.concat(moment === 'lunch' ? 'userLunch' : 'userDinner');
  else if (view === 'meals') URL = URL.concat(moment === 'lunch' ? 'mealsLunch' : 'mealsDinner');
  else URL = null;
  console.log(URL, moment, view);
  return Http.get(URL, dispatch, null, changeSelectedView, requestFailure);
}; */

export const getReservations = (mode, moment) => (dispatch) => {
  let URL = 'http://localhost:4000/';
  if (mode === 'users') URL = URL.concat(moment === 'lunch' ? 'userLunch' : 'userDinner');
  else if (mode === 'meals') URL = URL.concat(moment === 'lunch' ? 'mealsLunch' : 'mealsDinner');
  else URL = null;
  console.log(URL, moment, mode);
  return Http.get(URL, dispatch, fetchReservationsStarted, fetchReservationsSuccess,
    requestFailure);
};

export const deleteReservation = (moment, id) => (dispatch) => {
  const baseURL = 'http://localhost:4000/';
  const URL = baseURL.concat(moment === 'lunch' ? 'userLunch/' : 'userDinner/').concat(`${id}`);
  return Http.delete(URL, dispatch, null, removeReservationSuccess.bind(this, id), requestFailure);
};

export const getDayMeals = (day, moment) => (dispatch) => {
  const URL = 'http://localhost:4000/todayMeals';
  return Http.get(URL, dispatch, null, loadDayMealsSuccess, requestFailure);
};

// REVIEW: trovare il modo di evitare l'aggiunta del json se è aperto il tab 'vista pasti'
export const postReservation = (data, moment) => (dispatch) => {
  const baseURL = 'http://localhost:4000/';
  const URL = baseURL.concat(moment === 'lunch' ? 'userLunch/' : 'userDinner/');
  return Http.post(URL, dispatch, data, null, addReservationSuccess, requestFailure);
};
