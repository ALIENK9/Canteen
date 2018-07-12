import * as actionTypes from '../../actions/reservations/actionTypes';

const initialState = 'lunch';

const reservationsMomentReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case actionTypes.CHANGE_SELECTED_MOMENT:
      return action.payload.moment;
  }
};

export default reservationsMomentReducer;
