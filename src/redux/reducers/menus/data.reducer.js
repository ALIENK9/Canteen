import * as actionTypes from '../../actions/menus/menus.actionTypes';
import { immutableUpdate } from '../../utils';

const init = {
  meals: {
    dinner: [],
    lunch: [],
  },
};

const data = (state = init, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MENU_SUCCESS:
      return {
        ...state,
        meals: action.payload.json,
      };
    case actionTypes.FETCH_MENU_FAILURE:
      return init;
    case actionTypes.TOGGLE_MEAL:
      return {
        ...state,
        meals: {
          ...state.meals,
          [action.payload.moment]: immutableUpdate(state.meals[action.payload.moment],
            action.payload.index, { checked: action.payload.value }),
        },
      };
    default:
      return state;
  }
};

export default data;
