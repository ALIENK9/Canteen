import * as actionTypes from '../../actions/reservations/reservations.actionTypes';

const init = {
  error: '',
  success: '',
  addFormError: '',
};

const messages = (state = init, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_MESSAGES:
      return init;
    case actionTypes.LOAD_DAYMEALS_FAILURE:
    case actionTypes.LOAD_USERS_FAILURE: // invaida anche i dati svuotando l'array
    case actionTypes.SHOW_RESERVATION_ERROR_FORM: // inserisce solo l'errore
      return {
        ...state,
        addFormError: action.payload.error,
      };
    case actionTypes.LOAD_USERS_SUCCESS:
    case actionTypes.HIDE_RESERVATION_ERROR_FORM:
    case actionTypes.LOAD_DAYMEALS_SUCCESS:
      return {
        ...state,
        addFormError: '',
      };
    case actionTypes.RESERVATION_REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case actionTypes.REMOVE_RESERVATION_SUCCESS:
    case actionTypes.ADD_RESERVATION_SUCCESS:
    case actionTypes.FETCH_RESERVATIONS_SUCCESS:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
};

export default messages;
