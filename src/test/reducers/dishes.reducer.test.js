import { Reducer } from 'redux-testkit';
import Immutable from 'seamless-immutable';
import dishesReducer from '../../redux/reducers/dishes/dishes.reducer';
import {
  fetchDishesSuccess, requestFailure, clearMessages, addDishStarted, addDishSuccess,
  removeDishSuccess,
  removeDishFailure,
} from '../../redux/actions/dishes/dishes.actions';

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
    searchtext: '',
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

  it('should start add new dish', () => {
    Reducer(dishesReducer).expect(addDishStarted())
      .toReturnState({ ...initState, ui: { ...initState.ui, addLoading: true } });
  });

  it('should stop loading after new dish add success', () => {
    const dish = {
      name: 'AS',
      type: 1,
      id: '2112',
      description: 'none',
    };
    Reducer(dishesReducer).expect(addDishSuccess(dish))
      .toReturnState({
        ...initState,
        ui: { ...initState.ui, addLoading: false },
        data: {
          list: [dish],
        },
      });
  });

  it('should stop loading after dish delete', () => {
    const dishes = [
      {
        name: 'Pasta',
        type: 1,
        id: '2',
        description: 'p a sks',
      },
      {
        name: 'Pasta due',
        type: 3,
        id: '1',
        description: 'p a sks',
      },
    ];

    Reducer(dishesReducer).withState({ ...initState, data: { list: dishes } })
      .expect(removeDishSuccess('3')).toReturnState({
        ...initState,
        data: { list: dishes },
      });
  });

  it('should delete a dish', () => {
    const dishes = [
      {
        name: 'Pasta',
        type: 1,
        id: '2',
        description: 'p a sks',
      },
      {
        name: 'Pasta due',
        type: 3,
        id: '1',
        description: 'p a sks',
      },
    ];

    Reducer(dishesReducer).withState({ ...initState, data: { list: dishes } })
      .expect(removeDishSuccess('2')).toReturnState({
        ...initState,
        data: { list: [dishes[1]] },
      });
  });

  it('should set message after remove failure', () => {
    Reducer(dishesReducer).expect(removeDishFailure('errore add/rem')).toReturnState({
      ...initState,
      messages: {
        ...initState.messages,
        error: 'errore add/rem',
      },
    });
  });
});
