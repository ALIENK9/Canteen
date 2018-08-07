import * as actionTypes from '../../actions/menus/menus.actionTypes';
import { immutableUpdate } from '../../utils';

const init = {
  /* meals: {
    dinner: [],
    lunch: [],
  },
  dishes: [],
  selected: {
    dinner: [],
    lunch: [],
  }, */
  entries: {
    id: '',
    lunch: [],
    dinner: [],
  },
};

const data = (state = init, action = {}) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_SUCCESS:
      return {
        ...state,
        entries: action.payload.entries,
      };
    /* case actionTypes.FETCH_DISHES_SUCCESS:
      return {
        ...state,
        dishes: action.payload.json,
      };
    case actionTypes.FETCH_MENU_SUCCESS:
      return {
        ...state,
        meals: action.payload.json,
      }; */
    case actionTypes.FETCH_MENU_FAILURE:
      return init;
    case actionTypes.TOGGLE_MEAL:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.moment]: immutableUpdate(state.entries[action.payload.moment],
            state.entries[action.payload.moment].findIndex(meal => meal.id === action.payload.id),
            { checked: action.payload.value }),
        },
      };
    default:
      return state;
  }
};

export default data;
