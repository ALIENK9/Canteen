import { Reducer } from 'redux-testkit';
import Immutable from 'seamless-immutable';
import reservations from '../../redux/reducers/reservations/reservations.reducer';
import {
  fetchReservationsStarted, fetchReservationsSuccess, requestFailure,
  removeReservationSuccess, removeReservationFailure, addReservationSuccess, addReservationStarted,
  clearMessages, showErrorForm, addModalShow, addModalHide, loadFormDataStarted,
  loadDayMealsSuccess, loadUsersSuccess, loadUsersFailure, loadDayMealsFailure,
  changeSelectedView, changeSelectedMoment, filterMeals, searchUser, hideErrorForm,
} from '../../redux/actions/reservations/reservations.actions';
import { FILTER_KEYS } from '../../containers/costants';

const initState = {
  data: {
    list: [],
    daymeals: [],
    users: [],
  },
  messages: {
    error: '',
    success: '',
    addFormError: '',
  },
  ui: {
    loading: false,
    view: 'meals',
    moment: 'lunch',
    addModalShow: false,
    filter: 'ALL',
    searchtext: '',
    addLoading: false,
    formDataLoading: false,
  },
};

const userres = {
  user: {
    name: 'Pippo',
    id: 'id55',
  },
  meals: [
    {
      id: '1',
      name: 'Pasta al pomodoro',
      description: 'sdfdsfsdfdsfsdfds',
    },
    {
      id: '5',
      name: 'Polpettone',
      description: 'descrizione come stringa',
    },
  ],
  hour: '12:56',
  id: '6',
};

const astate = Immutable({
  data: {
    list: [
      userres,
    ],
    daymeals: [
      {
        name: 'Pasta al pomodoro',
        type: 1,
        description: 'Pasta con pomodoro siciliano',
        id: '1',
      },
      {
        name: 'Pasta al pesto',
        type: 1,
        description: 'Pasta con pesto e noci',
        id: '2',
      },
    ],
    users: [
      {
        id: '1',
        name: 'Carla de Carli',
      },
      {
        id: '2',
        name: 'Pippo Baudo',
      },
    ],
  },
  messages: {
    error: '',
    success: '',
    addFormError: '',
  },
  ui: {
    loading: false,
    view: 'users',
    moment: 'lunch',
    addModalShow: false,
    addLoading: false,
    filter: 'ALL',
    searchtext: '',
  },
});

describe('reservations reducer test', () => {
  it('should set loading to true', () => {
    Reducer(reservations).expect(fetchReservationsStarted()).toReturnState({
      ...initState,
      ui: {
        ...initState.ui,
        loading: true,
      },
    });
  });

  it('should fetch reservation success', () => {
    const fakedata = Immutable({
      user: {
        name: 'Pippo',
        id: 'id55',
      },
      meals: [
        {
          id: '1',
          name: 'Pasta al pomodoro',
          description: 'sdfdsfsdfdsfsdfds',
        },
        {
          id: '5',
          name: 'Polpettone',
          description: 'descrizione come stringa',
        },
      ],
      hour: '12:56',
      id: '6',
    });
    Reducer(reservations).expect(fetchReservationsSuccess([fakedata])).toReturnState(
      {
        ...initState,
        data: {
          ...initState.data,
          list: [
            fakedata,
          ],
        },
      },
    );
  });

  it('should invalidate data list after failure', () => {
    Reducer(reservations).withState(astate).expect(requestFailure('Errore!!')).toReturnState({
      ...astate,
      messages: {
        ...astate.messages,
        error: 'Errore!!',
      },
      data: {
        ...astate.data,
        list: [],
      },
    });
  });

  it('should remove error and set loading to false', () => {
    const mystate = Immutable({
      ...initState,
      messages: {
        ...initState.messages,
        error: 'Errore random',
      },
      ui: {
        ...initState.ui,
        loading: true,
      },
    });
    Reducer(reservations).withState(mystate).expect(fetchReservationsSuccess([{ data: 'hola' }])).toReturnState({
      ...mystate,
      messages: {
        ...initState.messages,
        error: '',
      },
      ui: {
        ...initState.ui,
        loading: false,
      },
      data: {
        ...initState.data,
        list: [{ data: 'hola' }],
      },
    });
  });

  it('should remove a reservation with success', () => {
    Reducer(reservations).withState(astate).expect(removeReservationSuccess('6')).toReturnState({
      ...astate,
      data: {
        ...astate.data,
        list: [],
      },
    });
  });

  it('should not remove anything', () => {
    Reducer(reservations).withState(astate).expect(removeReservationSuccess('11aa')) // not existent id
      .toReturnState(astate);
  });

  it('should fail remove and set error but not change list', () => {
    Reducer(reservations).withState(astate).expect(removeReservationFailure('NOT REMOVED'))
      .toReturnState({
        ...astate,
        messages: {
          ...astate.messages,
          error: 'NOT REMOVED',
        },
      });
  });

  it('should add a reservations', () => {
    const res = {
      user: {
        name: 'Pane gross0',
        id: 'e98sad0s8uf0ds',
      },
      meals: [
        {
          id: '2',
          name: 'Pasta al psdsdsdsdomodoro',
          description: 'sdfdsfsdfdsfsdfds',
        },
        {
          id: '1',
          name: 'Povero',
          description: 'descrizione come stringa',
        },
      ],
      hour: '12:45',
      id: '8',
    };
    Reducer(reservations).withState({ ...astate, ui: { ...astate.ui, addLoading: true } })
      .expect(addReservationSuccess(res)).toReturnState({
        ...astate,
        data: {
          ...astate.data,
          list: [
            ...astate.data.list,
            res,
          ],
        },
        messages: {
          ...astate.messages,
        },
        ui: { ...astate.ui, addLoading: false },
      });
  });

  it('should start loading after reservation add', () => {
    Reducer(reservations).withState(astate).expect(addReservationStarted()).toReturnState({
      ...astate,
      ui: {
        ...astate.ui,
        addLoading: true,
      },
    });
  });

  it('should clear all messages', () => {
    Reducer(reservations).withState(Immutable({
      ...astate,
      messages: { ...astate.messages, success: '1212', error: '222as' },
    })).expect(clearMessages()).toReturnState({
      ...astate,
      messages: { ...astate.messages, success: '', error: '' },
    });
  });

  it('should show modal for reservation add', () => {
    Reducer(reservations).withState(astate).expect(addModalShow()).toReturnState({
      ...astate,
      ui: { ...astate.ui, addModalShow: true },
    });
  });

  it('should hide add panel', () => {
    Reducer(reservations).withState(Immutable({
      ...astate,
      ui: { ...astate.ui, addModalShow: true },
    })).expect(addModalHide()).toReturnState({
      ...astate,
      ui: { ...astate.ui, addModalShow: false },
    });
  });

  it('should start spinner in form while loading data', () => {
    Reducer(reservations).withState(astate).expect(loadFormDataStarted()).toReturnState({
      ...astate,
      data: { ...astate.data, daymeals: [], users: [] },
      ui: { ...astate.ui, formDataLoading: true },
    });
  });

  it('should set users correctly and stop loading', () => {
    const users = [
      {
        name: 'Pippi',
        id: '12121',
      },
      {
        name: 'Giova',
        id: 'a',
      },
    ];
    Reducer(reservations).withState(Immutable({
      ...initState,
      ui: { ...initState.ui, addModalShow: true, formDataLoading: true },
    })).expect(loadUsersSuccess(users)).toReturnState({
      ...initState,
      ui: { ...initState.ui, addModalShow: true, formDataLoading: false },
      data: { ...initState.data, users },
    });
  });

  it('should set daymeals correctly and stop loading', () => {
    const daymeals = [
      {
        name: 'Pippi',
        id: '12121',
        type: 1,
        description: '1213143',
      },
      {
        name: 'Giova21',
        id: 'a',
        type: 3,
        description: '2',
      },
    ];
    Reducer(reservations).withState(Immutable({
      ...initState,
      ui: { ...initState.ui, addModalShow: true, formDataLoading: true },
    })).expect(loadDayMealsSuccess(daymeals)).toReturnState({
      ...initState,
      ui: { ...initState.ui, addModalShow: true, formDataLoading: false },
      data: { ...initState.data, daymeals },
    });
  });

  it('should set error and stop loading after unsuccessful users fetch and reset data', () => {
    Reducer(reservations).withState(Immutable({
      ...astate,
      ui: { ...astate.ui, addModalShow: true, formDataLoading: true },
    })).expect(loadUsersFailure('error user')).toReturnState({
      ...astate,
      ui: { ...astate.ui, addModalShow: true, formDataLoading: false },
      data: { ...astate.data, users: [] },
      messages: { ...astate.messages, addFormError: 'error user' },
    });
  });

  it('should set error and stop loading after unsuccessful daymeals fetch and reset data', () => {
    Reducer(reservations).withState(Immutable({
      ...astate,
      ui: { ...astate.ui, addModalShow: true, formDataLoading: true },
    })).expect(loadDayMealsFailure(null)).toReturnState({
      ...astate,
      ui: { ...astate.ui, addModalShow: true, formDataLoading: false },
      data: { ...astate.data, daymeals: [] },
      messages: { ...astate.messages, addFormError: null },
    });
  });

  it('should change selected view from meals to users', () => {
    Reducer(reservations).expect(changeSelectedView('users')).toReturnState({
      ...initState,
      ui: {
        ...initState.ui,
        view: 'users',
      },
    });
  });

  it('should change selected moment from dinner to lunch', () => {
    const state = Immutable({
      ...astate,
      ui: {
        ...astate.ui,
        moment: 'dinner',
      },
    });
    Reducer(reservations).withState(state).expect(changeSelectedMoment('lunch')).toReturnState({
      ...state,
      ui: {
        ...state.ui,
        moment: 'lunch',
      },
    });
  });

  it('should set res filter', () => {
    Reducer(reservations).withState(initState).expect(filterMeals(FILTER_KEYS.DESSERT))
      .toReturnState({
        ...initState,
        ui: {
          ...initState.ui,
          filter: FILTER_KEYS.DESSERT,
        },
      });
  });

  it('should set searched reservation id', () => {
    const reactSelectObj = { value: 'bob_id', label: 'Bob Dilama' };
    // 'reactSelectObj' è l'oggetto contenuto nell'evento lanciato da React-select
    Reducer(reservations).withState(initState).expect(searchUser(reactSelectObj))
      .toReturnState({
        ...initState,
        ui: {
          ...initState.ui,
          searchtext: 'bob_id',
        },
      });
  });

  it('should show error in form', () => {
    Reducer(reservations).withState(initState).expect(showErrorForm('test'))
      .toReturnState({
        ...initState,
        messages: {
          ...initState.messages,
          addFormError: 'test',
        },
      });
  });

  it('should hide error displayed in form', () => {
    const state = Immutable({
      ...astate,
      messages: {
        ...astate.messages,
        addFormError: 'preset error',
      },
    });
    Reducer(reservations).withState(state).expect(hideErrorForm())
      .toReturnState({
        ...state,
        messages: {
          ...state.messages,
          addFormError: '',
        },
      });
  });

  it('should overwrite existing error in form', () => {
    const state = Immutable({
      ...astate,
      messages: {
        ...astate.messages,
        addFormError: 'preset error 2',
      },
    });
    Reducer(reservations).withState(state).expect(showErrorForm('new'))
      .toReturnState({
        ...state,
        messages: {
          ...state.messages,
          addFormError: 'new',
        },
      });
  });
});
