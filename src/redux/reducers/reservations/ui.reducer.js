import * as actionTypes from '../../actions/reservations/reservations.actionTypes';

const init = {
  loading: false,
  view: 'meals',
  moment: 'lunch',
  addModalShow: false,
};


const ui = (state = init, action) => {
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
    case actionTypes.FETCH_RESERVATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default ui;
