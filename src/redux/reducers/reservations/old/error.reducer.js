import * as actionTypes from '../../actions/reservations/actionTypes';

const initialState = '';

const reservationsErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case actionTypes.CLEAR_MESSAGES:
      return action.payload.error;
    case actionTypes.RESERVATION_REQUEST_FAILURE:
      return action.payload.error;
    case actionTypes.LOAD_DAYMEALS_FAILURE:
      return action.payload.error;
  }
};

export default reservationsErrorReducer;
