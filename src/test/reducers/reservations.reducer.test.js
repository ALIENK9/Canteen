import { Reducer } from 'redux-testkit';
import Immutable from 'seamless-immutable';
import reservations from '../../redux/reducers/reservations/reservations.reducer';
import {
  fetchReservationsStarted, fetchReservationsSuccess, requestFailure, removeReservationSuccess, removeReservationFailure, addReservationSuccess,
} from '../../redux/actions/reservations/reservations.actions';

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

const astate = {
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
    filter: 'ALL',
    searchtext: '',
  },
};

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
    const fakedata = {
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

  it('should invaidate data list after failure', () => {
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
    const state = Immutable(astate);
    Reducer(reservations).withState(state).expect(removeReservationSuccess('6')).toReturnState({
      ...astate,
      data: {
        ...astate.data,
        list: [],
      },
    });
  });

  it('should not remove anything', () => {
    const state = Immutable(astate);
    Reducer(reservations).withState(state).expect(removeReservationSuccess('11aa'))
      .toReturnState(state);
  });

  it('should fail remove and set error but not change list', () => {
    const state = Immutable(astate);
    Reducer(reservations).withState(state).expect(removeReservationFailure('NOT REMOVED'))
      .toReturnState({
        ...astate,
        messages: {
          ...astate.messages,
          error: 'NOT REMOVED',
        },
      });
  });

  it('should add a reservations', () => {
    const state = Immutable(astate);
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
    Reducer(reservations).withState(state).expect(addReservationSuccess(res))
      .toReturnState({
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
      });
  });
});
