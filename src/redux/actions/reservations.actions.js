import * as actionTypes from '../actionTypes';
import * as data from '../../db.json';


// const parseData = response => response.json();
// const failure = err => console.error(`FAILURE ${err}`);

// const getRequest = () => fetch('/localhost:4000/reservations/', { method: 'get' })
// .then(parseData).then(ciao => ciao);

export const fetchData = () => ({
  type: actionTypes.FETCH_RESERVATIONS_DATA,
  payload: data.reservations,
});

export const filterData = () => {

};
