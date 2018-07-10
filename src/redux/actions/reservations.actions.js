import * as actionTypes from '../actionTypes';
import Http from '../Http';


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

export const clearMessages = () => ({
  type: actionTypes.CLEAR_MESSAGES,
});


// ASYNC ACTIONS

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
