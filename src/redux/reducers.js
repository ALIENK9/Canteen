import * as types from './actionTypes';
import reservations from '../data/reserve.json';

const initialState = {
  reservations: [
    {
      name: 'Pasta alla salsiccia',
      reslist: [
        'Giovanni',
        'Ciccio',
        'Palladipelo',
      ],
    },
    {
      name: 'Polenta e funghi',
      reslist: [
        'Gianni',
        'Ciccio',
        'IO',
      ],
    },
  ],
};

const getData = () => reservations || initialState;

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RESERVATIONS_DATA:
      return { ...state, ...getData() };
    default:
      return state;
  }
};

export default rootReducer;
