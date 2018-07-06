import * as actionTypes from '../actionTypes';

const initialState = {
  list: [],
  loading: false, // bool
  error: null, // string || null
  success: null, // string || null
};


const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RESERVATIONS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_RESERVATIONS_SUCCESS:
      return {
        ...state,
        list: action.payload.json,
        error: false,
      };
    case actionTypes.FETCH_RESERVATIONS_FAILURE:
      return {
        ...state,
        list: [],
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reservationsReducer;
