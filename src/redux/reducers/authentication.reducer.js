import * as actionTypes from '../actionTypes';

const initialState = {
  user: null, // string || null
  admin: false, // bool
  loading: false, // bool
  error: null, // string || null
  success: null, // string || null
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        admin: false,
        loading: false,
        error: action.payload.error,
      };
    case actionTypes.LOGIN_SUCCESS:
      console.log(action.payload.user, action.payload.admin);
      return {
        ...state,
        user: action.payload.user,
        admin: action.payload.admin,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
