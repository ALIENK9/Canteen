import * as actionTypes from '../../actions/reservations/actionTypes';
import { immutableRemove, immutableAdd } from '../../utils';

const initialState = [];

const reservationsListReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case actionTypes.FETCH_RESERVATIONS_SUCCESS:
      return action.payload.json;
    case actionTypes.REMOVE_RESERVATION_SUCCESS:
      return immutableRemove(state, state.map(reserv => reserv.id).indexOf(action.payload.id));
    case actionTypes.RESERVATION_REQUEST_FAILURE:
      return [];
    case actionTypes.ADD_RESERVATION_SUCCESS:
      return immutableAdd(state, action.payload.json);
  }
};

export default reservationsListReducer;
