import * as actionTypes from '../../actions/reservations/reservations.actionTypes';

const init = {
  loading: false,
  view: 'meals',
  moment: 'lunch',
  addModalShow: false,
  filter: 'ALL',
  searchtext: '',
  addLoading: false,
};


const ui = (state = init, action = {}) => {
  switch (action.type) {
    case actionTypes.CHANGE_SELECTED_VIEW:
      return {
        ...state,
        view: action.payload.view,
      };
    case actionTypes.CHANGE_SELECTED_MOMENT:
      return {
        ...state,
        moment: action.payload.moment,
      };
    case actionTypes.ADD_MODAL_SHOW:
      return {
        ...state,
        addModalShow: true,
      };
    case actionTypes.ADD_RESERVATION_SUCCESS:
    case actionTypes.ADD_MODAL_HIDE:
      return {
        ...state,
        addModalShow: false,
      };
    case actionTypes.FETCH_RESERVATIONS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.RESERVATION_REQUEST_FAILURE:
    case actionTypes.FETCH_RESERVATIONS_SUCCESS:
    case actionTypes.REMOVE_RESERVATION_SUCCESS:
    case actionTypes.RESERVATION_ADD_REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.LOAD_FORM_DATA_STARTED:
      return {
        ...state,
        addLoading: true,
      };
    case actionTypes.LOAD_USERS_FAILURE:
    case actionTypes.LOAD_USERS_SUCCESS:
    case actionTypes.LOAD_DAYMEALS_FAILURE:
    case actionTypes.LOAD_DAYMEALS_SUCCESS:
      return {
        ...state,
        addLoading: false,
      };
    case actionTypes.FILTER_MEALS:
      return {
        ...state,
        filter: action.payload.filter,
      };
    case actionTypes.SEARCH_USER:
      console.log('searching text', action.payload.text.value);
      return {
        ...state,
        searchtext: action.payload.text.value,
      };
    default:
      return state;
  }
};

export default ui;
