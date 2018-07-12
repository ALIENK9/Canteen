import * as actionTypes from '../../actions/reservations/actionTypes';

const initialState = 'meals';

const reservationsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case actionTypes.CHANGE_SELECTED_VIEW:
      return action.payload.view;
  }
};

export default reservationsViewReducer;
