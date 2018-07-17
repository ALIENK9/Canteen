import * as actionTypes from '../../actions/menus/menus.actionTypes';

const init = {
  error: '',
  success: '',
};

const messages = (state = init, action) => {
  switch (action.type) {
    case actionTypes.POST_MENU_SUCCESS:
      return {
        ...state,
        error: '',
        success: 'Dati salvati correttamente',
      };
    case actionTypes.POST_MENU_FAILURE:
    case actionTypes.FETCH_MENU_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        success: '',
      };
    case actionTypes.FETCH_MENU_SUCCESS:
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
