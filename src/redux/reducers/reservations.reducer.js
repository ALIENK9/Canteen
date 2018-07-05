import * as types from '../actionTypes';

const initialState = {
  list: [],
  loading: false, // bool
  error: null, // string || null
  success: null, // string || null
};


const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RESERVATIONS_DATA:
      return { list: action.payload };
    default:
      return state;
  }
};

export default reservationsReducer;
