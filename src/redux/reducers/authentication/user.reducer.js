import * as actionTypes from '../../actions/authentication/authentication.actionTypes';

const init = {
  name: '',
  admin: false,
  token: '',
  id: '',
};


const authUser = (state = init, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_FAILURE: // shows a login error
      return init;
    case actionTypes.SET_CURRENT_USER: // doesn't show errors, siply set user (empty on logout)
      return action.payload.user;
    default:
      return state;
  }
};

export default authUser;
