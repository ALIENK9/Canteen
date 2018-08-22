import * as actionTypes from '../../actions/dishes/dishes.actionTypes';

const init = {
  loading: false, // loading lista di piatti
  addModalShow: false,
  addLoading: false, // loading per form di aggiunta piatto
  filter: 'ALL',
  searchtext: '',
};

const ui = (state = init, action = {}) => {
  switch (action.type) {
    case actionTypes.DISH_ADD_STARTED:
      return {
        ...state,
        addLoading: true,
      };
    case actionTypes.DISH_REMOVE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DISH_ADD_REMOVE_FAILURE:
    case actionTypes.REMOVE_DISH_SUCCESS:
      return {
        ...state,
        loading: false,
      };
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
    case actionTypes.SHOW_DISH_ERROR_FORM:
      return {
        ...state,
        addLoading: false,
        loading: false,
      };
    case actionTypes.ADD_DISH_SUCCESS:
      return {
        ...state,
        addModalShow: false,
        addLoading: false,
      };
    case actionTypes.FILTER_MEALS:
      return {
        ...state,
        filter: action.payload.filter,
      };
    case actionTypes.SEARCH_DISH:
      return {
        ...state,
        searchtext: action.payload.object.value,
      };
    default:
      return state;
  }
};

export default ui;
