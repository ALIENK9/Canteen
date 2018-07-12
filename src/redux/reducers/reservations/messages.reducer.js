import * as actionTypes from '../../actions/reservations/actionTypes';

const init = {
  error: '',
  success: '',
};

const messages = (state = init, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_MESSAGES:
      return init;
    case actionTypes.LOAD_DAYMEALS_FAILURE:
    case actionTypes.RESERVATION_REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default messages;
