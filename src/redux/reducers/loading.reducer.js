import * as res from '../actions/reservations/actionTypes';

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    default:
      return state;
    case res.FETCH_RESERVATIONS_SUCCESS:
      return false;
    case res.FETCH_RESERVATIONS_STARTED:
      return true;
  }
};

export default loadingReducer;
