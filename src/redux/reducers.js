import * as types from './actionTypes';

const initialState = {
  items: [
    {
      name: 'Pasta alla salsiccia',
      reservations: [
        'Giovanni',
        'Ciccio',
        'Palladipelo',
      ],
    },
    {
      name: 'Polenta e funghi',
      reservations: [
        'Giannoz',
        'Ciccio',
        'IO',
      ],
    },
  ],
};

const getData = () => initialState;

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RESERVATIONS_DATA:
      return { ...state, ...getData() };
    default:
      return state;
  }
};

export default rootReducer;
