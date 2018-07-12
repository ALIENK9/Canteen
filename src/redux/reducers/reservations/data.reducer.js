import * as actionTypes from '../../actions/reservations/actionTypes';
import { immutableRemove, immutableAdd } from '../../utils';

const init = {
  list: [],
  daymeals: [],
};


const data = (state = init, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RESERVATIONS_SUCCESS:
      return {
        ...state,
        list: action.payload.json,
      };
    case actionTypes.REMOVE_RESERVATION_SUCCESS:
      return {
        ...state,
        list: immutableRemove(state.list,
          state.list.map(reserv => reserv.id).indexOf(action.payload.id)),
      };
    case actionTypes.RESERVATION_REQUEST_FAILURE:
      return {
        ...state,
        list: [],
      };
    case actionTypes.ADD_RESERVATION_SUCCESS:
      return {
        ...state,
        list: immutableAdd(state.list, action.payload.json),
      };
    case actionTypes.LOAD_DAYMEALS_SUCCESS:
      return {
        ...state,
        daymeals: action.payload.json,
      };
    case actionTypes.LOAD_DAYMEALS_FAILURE:
      return {
        ...state,
        daymeals: [],
      };
    default:
      return state;
  }
};

export default data;
