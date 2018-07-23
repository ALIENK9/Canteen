import * as actionTypes from '../../actions/authentication/authentication.actionTypes';

const init = {
  loading: false,
};


const authUi = (state = init, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SET_CURRENT_USER:
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default authUi;
