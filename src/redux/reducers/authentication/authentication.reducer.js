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
