import * as actionTypes from '../../actions/dishes/dishes.actionsTypes';

const init = {
  loading: false,
  addModalShow: false,
  filter: 'ALL',
};

const ui = (state = init, action = {}) => {
  switch (action.type) {
    case actionTypes.FETCH_DISHES_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_DISHES_SUCCESS:
    case actionTypes.DISH_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SHOW_ADD_DISH_FORM:
      return {
        ...state,
        addModalShow: true,
      };
    case actionTypes.HIDE_ADD_DISH_FORM:
      return {
        ...state,
        addModalShow: false,
      };
    case actionTypes.ADD_DISH_SUCCESS:
      return {
        ...state,
        addModalShow: false,
      };
    case actionTypes.FILTER_MEALS:
      return {
        ...state,
        filter: action.payload.filter,
      };
    default:
      return state;
  }
};

export default ui;
