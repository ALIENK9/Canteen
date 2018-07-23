import * as actionTypes from '../../actions/authentication/authentication.actionTypes';

const init = {
  name: '',
  admin: false,
  token: '',
};


const authUser = (state = init, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_FAILURE:
      return init;
    case actionTypes.SET_CURRENT_USER:
      return action.payload.user;
    default:
      return state;
  }
};

export default authUser;
