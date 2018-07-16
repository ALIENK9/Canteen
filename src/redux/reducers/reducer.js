import reservationsReducer from './reservations/reservations.reducer';
import menusReducer from './menus.reducer';
import dishesReducer from './dishes/dishes.reducer';
import authReducer from './authentication.reducer';

// const getResData = () => reservations || { reservations: [] };
// const getMenuData = () => menu || { meals: [] };

const rootReducer = (state = {}, action) => ({
  reservations: reservationsReducer(state.reservations, action),
  menus: menusReducer(state.menus, action),
  dishes: dishesReducer(state.dishes, action),
  authentication: authReducer(state.authentication, action),
});

export default rootReducer;
