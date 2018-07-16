import * as actionTypes from '../../actions/dishes/dishes.actionsTypes';
import { immutableAdd, immutableRemove } from '../../utils';


const init = {
  list: [],
};

const data = (state = init, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DISHES_SUCCESS:
      return {
        ...state,
        list: action.payload.json,
      };
    case actionTypes.DISH_REQUEST_FAILURE:
      return {
        ...state,
        list: [],
      };
    case actionTypes.REMOVE_DISH_SUCCESS:
      return {
        ...state,
        list: immutableRemove(state.list,
          state.list.map(dish => dish.id).indexOf(action.payload.id)),
      };
    case actionTypes.ADD_DISH_SUCCESS:
      return {
        ...state,
        list: immutableAdd(state.list, action.payload.dish),
      };
    default:
      return state;
  }
};

export default data;
