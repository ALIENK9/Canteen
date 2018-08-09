import { createSelector } from 'reselect';

export const getSearchKey = state => state.ui.searchtext;
export const getReservations = state => state.data.list;

const getSearchedReservation = createSelector(
  [getSearchKey, getReservations],
  (id, reservations) => {
    if (!id) return reservations;
    const result = reservations.find(res => res.user.id === id);
    return result ? [result] : [];
  },
);

export default getSearchedReservation;
