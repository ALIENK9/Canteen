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
        entries: action.payload.entries || {},
      };
    case actionTypes.POST_MENU_SUCCESS:
      return {
        ...state,
        entries: {
          ...state.entries,
          id: action.payload.id,
        },
      };
    case actionTypes.DELETE_MENU_SUCCESS:
      return {
        ...state,
        entries: {
          id: '',
          lunch: state.entries.lunch.map(meal => ({ ...meal, checked: false })),
          dinner: state.entries.dinner.map(meal => ({ ...meal, checked: false })),
        },
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
      console.log('Toggling checked', action.payload.moment, action.payload.id, action.payload.value);
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
