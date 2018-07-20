import * as actionTypes from '../../actions/login/login.actionTypes';
import isEmptyObject from '../../../validation/validationUtils';

const initialState = {
  isAuthenticated: false,
  user: {
    name: '',
    admin: false,
  }, // string || null
  // token: '', // string
  loading: false, // bool
  error: '', // string || null
  success: '', // string || null
};


const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: {
          name: '',
          admin: false,
        },
        loading: false,
        error: action.payload.error,
      };
    case actionTypes.LOGIN_SUCCESS:
      console.log(action.payload.user, action.payload.admin);
      return {
        ...state,
        isAuthenticated: !!action.payload.auth.identifier,
        user: {
          name: action.payload.auth.identifier,
          admin: action.payload.auth.admin,
        },
        loading: false,
        error: '',
      };
    case actionTypes.SET_CURRENT_USER: {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: !isEmptyObject(user),
        user,
        loading: false,
      };
    }
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

export default authReducer;
