import { Reducer } from 'redux-testkit';
import Immutable from 'seamless-immutable';
import dishesReducer from '../../redux/reducers/dishes/dishes.reducer';
import {
  fetchDishesSuccess, requestFailure, clearMessages, addDishStarted, addDishSuccess,
  removeDishSuccess,
  removeDishFailure,
  filterMeals,
  searchDish,
  showAddForm,
  hideAddForm,
  showErrorForm,
  hideErrorForm,
} from '../../redux/actions/dishes/dishes.actions';
import { FILTER_KEYS } from '../../containers/costants';

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

  it('should stop loading and add new dish', () => {
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

  it('should stop loading after new dish add failure and set message', () => {
    Reducer(dishesReducer).expect(showErrorForm('qwerty'))
      .toReturnState({
        ...initState,
        ui: { ...initState.ui, addLoading: false },
        messages: { ...initState.messages, addFormError: 'qwerty' },
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

  it('should set message after remove failure and stop loading', () => {
    const astate = { ...initState, ui: { ...initState.ui, loading: true } };
    Reducer(dishesReducer).withState(astate).expect(removeDishFailure('errore add/rem')).toReturnState({
      ...astate,
      ui: { ...astate.ui, loading: false },
      messages: {
        ...astate.messages,
        error: 'errore add/rem',
      },
    });
  });

  it('should set dish filter', () => {
    Reducer(dishesReducer).expect(filterMeals(FILTER_KEYS.SECOND)).toReturnState({
      ...initState,
      ui: {
        ...initState.ui,
        filter: FILTER_KEYS.SECOND,
      },
    });
  });

  it('should set search text', () => {
    const reactSelectObj = { label: 'sds', value: '99' };
    Reducer(dishesReducer).expect(searchDish(reactSelectObj)).toReturnState({
      ...initState,
      ui: {
        ...initState.ui,
        searchtext: '99',
      },
    });
  });

  it('should show dishes add form', () => {
    Reducer(dishesReducer).expect(showAddForm()).toReturnState({
      ...initState,
      ui: {
        ...initState.ui,
        addModalShow: true,
      },
    });
  });

  it('should hide dishes add form', () => {
    Reducer(dishesReducer).expect(hideAddForm()).toReturnState({
      ...initState,
      ui: {
        ...initState.ui,
        addModalShow: false,
      },
    });
  });

  it('should show null dish error form', () => {
    const astate = Immutable({
      ...initState,
      ui: {
        ...initState.ui,
        addModalShow: true,
      },
    });
    Reducer(dishesReducer).withState(astate).expect(showErrorForm(null)).toReturnState({
      ...astate,
      messages: {
        ...astate.messages,
        addFormError: null,
      },
    });
  });

  it('should show valid dish error form', () => {
    Reducer(dishesReducer).expect(showErrorForm('hello')).toReturnState({
      ...initState,
      messages: {
        ...initState.messages,
        addFormError: 'hello',
      },
    });
  });

  it('should hide dish error form', () => {
    const astate = Immutable({
      ...initState,
      ui: {
        ...initState.ui,
        addModalShow: true,
      },
      messages: {
        ...initState.messages,
        addFormError: 'errore',
      },
    });
    Reducer(dishesReducer).withState(astate).expect(hideErrorForm()).toReturnState({
      ...astate,
      messages: {
        ...astate.messages,
        addFormError: '',
      },
    });
  });
});
