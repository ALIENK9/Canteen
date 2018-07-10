import * as actionTypes from '../actionTypes';
import { immutableRemove } from '../utils';

const initialState = {
  list: [],
  loading: false, // bool
  error: null, // string || null
  success: null, // string || null
};


const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RESERVATIONS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_RESERVATIONS_SUCCESS:
      return {
        ...state,
        list: action.payload.json,
        error: null,
      };
    case actionTypes.REMOVE_RESERVATION_SUCCESS:
      return {
        ...state,
        list: immutableRemove(state.list,
          state.list.map(reserv => reserv.id).indexOf(action.payload.id)),
        error: null,
      };
    case actionTypes.RESERVATION_REQUEST_FAILURE:
      return {
        ...state,
        list: [],
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reservationsReducer;
