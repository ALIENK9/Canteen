import * as actionTypes from '../actionTypes';
import { immutableUpdate } from '../utils';

const initialState = {
  meals: {
    lunch: [],
    dinner: [],
  },
  loading: false, // bool
  error: null, // string || null
  success: null, // string || null
};

const menusReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MENU_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case actionTypes.FETCH_MENU_SUCCESS:
      return {
        ...state,
        meals: action.payload.json,
        loading: false,
      };
    case actionTypes.FETCH_MENU_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case actionTypes.POST_MENU_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.POST_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        success: 'Dati salvati correttamente',
      };
    case actionTypes.POST_MENU_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
        success: null,
      };
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


export default menusReducer;
