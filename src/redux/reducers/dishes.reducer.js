import * as actionTypes from '../actionTypes';
import { immutableRemove } from '../utils';

const initialAddState = {
  show: false, // bool
  error: null, // string | null
};

const addReducer = (state = initialAddState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_ADD_FORM:
      return {
        show: true,
        error: null,
      };
    case actionTypes.HIDE_ADD_FORM:
      return {
        show: false,
        error: null,
      };
    case actionTypes.SHOW_ERROR_FORM:
      console.log('reducing error form: ', action.payload.error);
      return {
        ...state,
        error: action.payload.error,
      };
    case actionTypes.HIDE_ERROR_FORM:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const initialState = {
  list: [], // lista di oggetti che sono i piatti
  loading: false, // bool
  error: null, // string | null
  success: null, // string | null
  add: initialAddState,
};

const dishesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DISHES_SUCCESS:
      return {
        ...state,
        list: action.payload.json,
        loading: false,
        error: null,
      };
    case actionTypes.DISH_REQUEST_FAILURE:
      return {
        ...state,
        list: [],
        error: action.payload.error,
        loading: false,
      };
    case actionTypes.REMOVE_DISH_SUCCESS:
      return {
        ...state,
        list: immutableRemove(state.list,
          state.list.map(dish => dish.name).indexOf(action.payload.id)),
      };
    case actionTypes.CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
        success: null,
      };
    case actionTypes.SHOW_ADD_FORM: // cascata di azioni che sono rimandate al reducer di add
    case actionTypes.HIDE_ADD_FORM:
    case actionTypes.SHOW_ERROR_FORM:
    case actionTypes.HIDE_ERROR_FORM:
      console.log('showing error');
      return {
        ...state,
        add: addReducer(state.add, action),
      };
    default:
      return state;
  }
};

export default dishesReducer;
