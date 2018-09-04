import * as actionTypes from '../../actions/menus/menus.actionTypes';

const init = {
  loading: false,
  moment: 'lunch',
  filter: 'ALL',
};

const ui = (state = init, action = {}) => {
  switch (action.type) {
    case actionTypes.POST_MENU_STARTED:
    case actionTypes.FETCH_MENU_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.POST_MENU_FAILURE:
    case actionTypes.DELETE_MENU_SUCCESS:
    case actionTypes.DELETE_MENU_FAILURE:
    case actionTypes.POST_MENU_SUCCESS:
    case actionTypes.PUT_MENU_SUCCESS:
    case actionTypes.FETCH_MENU_FAILURE:
    case actionTypes.FETCH_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.CHANGE_SELECTED_MOMENT:
      return {
        ...state,
        moment: action.payload.moment,
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
