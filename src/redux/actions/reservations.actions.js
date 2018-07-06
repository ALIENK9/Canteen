import * as actionTypes from '../actionTypes';
import Http from '../Http';


export const fetchReservationsStarted = () => ({
  type: actionTypes.FETCH_RESERVATIONS_STARTED,
});

export const fetchReservaionsSuccess = json => ({
  type: actionTypes.FETCH_RESERVATIONS_SUCCESS,
  payload: { json },
});

export const fetchReservaionsFailure = error => ({
  type: actionTypes.FETCH_RESERVATIONS_FAILURE,
  payload: { error },
});

// ASYNC ACTIONS

export const getReservations = () => (dispatch) => {
  const URL = 'http://localhost:4000/reservations';
  return Http.get(URL, dispatch, fetchReservationsStarted, fetchReservaionsSuccess,
    fetchReservaionsFailure);
};
