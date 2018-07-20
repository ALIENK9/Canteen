import { combineReducers } from 'redux';
import reservationsReducer from './reservations/reservations.reducer';
import menusReducer from './menus/menus.reducer';
import dishesReducer from './dishes/dishes.reducer';
import authReducer from './authentication/authentication.reducer';


// const getResData = () => reservations || { reservations: [] };
// const getMenuData = () => menu || { meals: [] };

const rootReducer = combineReducers({
  reservations: reservationsReducer,
  menus: menusReducer,
  dishes: dishesReducer,
  authentication: authReducer,
});

export default rootReducer;
