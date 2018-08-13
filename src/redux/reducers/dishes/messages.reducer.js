import * as actionTypes from '../../actions/dishes/dishes.actionTypes';

const init = {
  error: '',
  success: '',
  addFormError: '',
};

const messages = (state = init, action = {}) => {
  switch (action.type) {
    case actionTypes.FETCH_DISHES_SUCCESS:
      return {
        ...state,
        error: '',
      };
    case actionTypes.DISH_ADD_REMOVE_FAILURE:
    case actionTypes.DISH_REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case actionTypes.SHOW_DISH_ERROR_FORM:
      return {
        ...state,
        addFormError: action.payload.error,
      };
    case actionTypes.ADD_DISH_SUCCESS:
    case actionTypes.HIDE_DISH_ERROR_FORM:
      return {
        ...state,
        addFormError: '',
      };
    case actionTypes.CLEAR_MESSAGES:
      return {
        ...state,
        error: '',
        success: '',
      };
    default:
      return state;
  }
};

export default messages;
