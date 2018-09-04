import { combineReducers } from 'redux';
import data from './data.reducer';
import ui from './ui.reducer';
import messages from './messages.reducer';


const reservationsReducer = combineReducers({
  data,
  ui,
  messages,
});

export default reservationsReducer;
