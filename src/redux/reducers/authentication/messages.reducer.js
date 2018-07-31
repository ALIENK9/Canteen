import * as actionTypes from '../../actions/authentication/authentication.actionTypes';

const init = {
  error: '',
  success: '',
};


const authMessages = (state = init, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.CLEAR_MESSAGES:
      return init;
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        success: '',
        error: action.payload.error,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
};

export default authMessages;
