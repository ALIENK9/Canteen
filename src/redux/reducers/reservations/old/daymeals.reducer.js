import * as actionTypes from '../../actions/reservations/actionTypes';

const initialState = [];

const reservationsDaymealsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case actionTypes.LOAD_DAYMEALS_SUCCESS:
      return action.payload.json;
    case actionTypes.LOAD_DAYMEALS_FAILURE:
      return [];
  }
};

export default reservationsDaymealsReducer;
