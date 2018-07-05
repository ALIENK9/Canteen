import * as types from '../actionTypes';
import { immutableRemove } from '../utils';

const initialState = {
  list: [], // lista di oggetti che sono i piatti
  loading: false, // bool
  error: null, // string || null
  success: null, // string || null
};

const dishesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DISHES_SUCCESS:
      return {
        list: action.payload.json,
        error: null,
      };
    case types.DISH_REQUEST_FAILURE:
      return {
        list: [],
        error: action.payload.error,
      };
    case types.REMOVE_DISH:
      return {
        ...state,
        list: immutableRemove(state.list,
          state.list.map(dish => dish.name).indexOf(action.payload.id)),
      };
    case types.CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};

export default dishesReducer;
