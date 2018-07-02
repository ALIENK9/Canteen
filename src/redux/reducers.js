import * as types from './actionTypes';
import { immutableUpdate } from './utils';

// const getResData = () => reservations || { reservations: [] };
// const getMenuData = () => menu || { meals: [] };

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_RESERVATIONS_DATA:
      return { ...action.payload };
    case types.FETCH_MENU_DATA:
      return { ...action.payload };
    case types.TOGGLE_MEAL: // decidere cosa fare con questa action e CONNETTERE redux a MenuList
      return {
        ...state,
        meals: immutableUpdate(state.meals, action.payload.index,
          { checked: action.payload.value }),
      };
    default:
      return state;
  }
};

export default rootReducer;
