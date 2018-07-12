import { combineReducers } from 'redux';
import data from './data.reducer';
import ui from './ui.reducer';
import messages from './messages.reducer';


const reservationsReducer = combineReducers({
  data,
  ui,
  messages,
});


/* (state = initialState, action) => {
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
    case actionTypes.CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}; */

export default reservationsReducer;
