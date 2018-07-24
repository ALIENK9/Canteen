import { isEmpty } from 'lodash';
import * as actionTypes from '../../actions/authentication/authentication.actionTypes';
// import isEmptyObject from '../../../validation/validationUtils';

const init = false;

const isAuthReducer = (state = init, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER: {
      const { user } = action.payload;
      return !isEmpty(user);
    }
    case actionTypes.LOGIN_FAILURE:
      return false;
    default:
      return state;
  }
};


export default isAuthReducer;
