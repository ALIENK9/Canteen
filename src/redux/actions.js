import * as actionTypes from './actionTypes';
import reservations from '../data/reserve.json';

export const fetchData = () => ({
  type: actionTypes.FETCH_RESERVATIONS_DATA,
  payload: reservations,
});

export const filterData = () => {

};
