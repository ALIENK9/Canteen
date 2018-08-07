import { Reducer } from 'redux-testkit';
import Immutable from 'seamless-immutable';
import dishesReducer from '../../redux/reducers/dishes/dishes.reducer';
import { fetchDishesSuccess, requestFailure, clearMessages } from '../../redux/actions/dishes/dishes.actions';

const initState = {
  data: {
    list: [],
  },
  messages: {
    error: '',
    success: '',
    addFormError: '',
  },
  ui: {
    loading: false,
    addModalShow: false,
    filter: 'ALL',
    addLoading: false,
  },
};

const NOACTION = { type: 'NOT_AN_ACTION' };

describe('dishes.reducer', () => {
  it('Should not affect state and return initial', () => {
    Reducer(dishesReducer).expect(NOACTION).toReturnState(initState);
  });

  it('Should fetch dishes', () => {
    const dishes = [
      {
        name: 'Pasta',
        type: 1,
        id: 2,
        description: 'p a sks',
      },
      {
        name: 'Pasta due',
        type: 3,
        id: 1,
        description: 'p a sks',
      },
    ];
    Reducer(dishesReducer).expect(fetchDishesSuccess(dishes))
      .toReturnState({ ...initState, data: { list: dishes } });
  });

  it('Should set state error after fetch', () => {
    Reducer(dishesReducer).expect(requestFailure('Error: get failed'))
      .toReturnState({ ...initState, messages: { ...initState.messages, error: 'Error: get failed' } });
  });

  it('Should not change original state object', () => {
    const state = Immutable({ ...initState, messages: { ...initState.messages, success: 'succ', error: 'err' } });
    Reducer(dishesReducer).withState(state).expect(clearMessages()).toReturnState(initState);
  });
});
