import * as actionTypes from '../../actions/login/login.actionTypes';

const initialState = {
  user: null, // string || null
  token: '', // string
  admin: false, // bool
  loading: false, // bool
  error: '', // string || null
  redirect: false,
  success: '', // string || null
};


const authReducer = (state = initialState, action) => {
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
        user: null,
        admin: false,
        loading: false,
        error: action.payload.error,
        redirect: false,
        token: '',
      };
    case actionTypes.LOGIN_SUCCESS:
      console.log(action.payload.user, action.payload.admin);
      return {
        ...state,
        user: action.payload.auth.user,
        admin: action.payload.auth.admin,
        loading: false,
        error: '',
        redirect: true,
        token: action.payload.auth.token,
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

export default authReducer;
