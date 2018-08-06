import { createSelector } from 'reselect';

export const getSearchKey = state => state.ui.searchtext;
export const getReservations = state => state.data.list;

const getSearchedReservation = createSelector(
  [getSearchKey, getReservations],
  (id, reservations) => (id ? reservations.find(user => user.id === id) : reservations),
);

export default getSearchedReservation;
