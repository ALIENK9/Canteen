import { combineReducers } from 'redux';
import user from './user.reducer';
import messages from './messages.reducer';
import ui from './ui.reducer';
import isAuthenticated from './isAuthenticated.reducer';

const authReducer = combineReducers({
  isAuthenticated,
  user,
  messages,
  ui,
});

export default authReducer;

/* const s = (state = initialState, action = {}) => {
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
}; */
