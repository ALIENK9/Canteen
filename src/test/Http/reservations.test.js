import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockResponse from './mockResponse';
import * as actions from '../../redux/actions/reservations/reservations.actionTypes';
import {
  getReservations, deleteReservation, getUserList, getDayMenu, postReservation,
} from '../../redux/actions/reservations/reservations.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Reservayions async actions test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const reslist = [
    {
      name: 'Pasta Pomodoro',
      id: '12s',
      users: [
        {
          id: '1212',
          name: 'Pollo Arrosto',
        },
        {
          id: '1qaa',
          name: 'Pino Dullo',
        },
      ],
    },
    {
      name: 'Pure ptata',
      id: 'erfdwq',
      users: [
        {
          id: 'saa',
          name: 'Paolo Bello',
        },
      ],
    },
  ];

  it('should fetch reservations', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify(reslist))));
    await store.dispatch(getReservations('meals', '2018-03-05', 'lunch'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_RESERVATIONS_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.FETCH_RESERVATIONS_SUCCESS,
      payload: {
        json: reslist,
      },
    });
  });

  it('should fetch reservations using empty array in DB is empty', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(404,
      JSON.stringify({ scope: 'db' }))));
    await store.dispatch(getReservations('meals', '2018-03-05', 'lunch'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_RESERVATIONS_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.FETCH_RESERVATIONS_SUCCESS,
      payload: {
        json: null,
      },
    });
  });

  it('should fail to fetch reservation with generic error', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(404,
      JSON.stringify({ }))));
    await store.dispatch(getReservations('meals', '2018-03-05', 'lunch'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_RESERVATIONS_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.RESERVATION_REQUEST_FAILURE,
      payload: {
        error: 'Impossibile completare la richiesta. Riprova o attendi qualche minuto',
      },
    });
  });

  it('should fail to fetch reservation with server error', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(404,
      JSON.stringify({ message: 'errore mio' }))));
    await store.dispatch(getReservations('meals', '2018-03-05', 'lunch'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_RESERVATIONS_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.RESERVATION_REQUEST_FAILURE,
      payload: {
        error: 'errore mio',
      },
    });
  });

  it('should delete a reservation', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify({}))));
    await store.dispatch(deleteReservation('id-res'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_RESERVATIONS_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.REMOVE_RESERVATION_SUCCESS,
      payload: { id: 'id-res' },
    });
  });

  it('should fail to delete a reservation and set general error', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(401,
      JSON.stringify({}))));
    await store.dispatch(deleteReservation('id-res'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_RESERVATIONS_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.RESERVATION_ADD_REMOVE_FAILURE,
      payload: { error: 'Impossibile effettuare la richiesta di cancellazione' },
    });
  });

  it('should fail to delete a reservation and set server error', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(404,
      JSON.stringify({ message: 'custom.error', scope: 'db' })))); // scope è ignorato
    await store.dispatch(deleteReservation('id-res'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_RESERVATIONS_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.RESERVATION_ADD_REMOVE_FAILURE,
      payload: { error: 'custom.error' },
    });
  });

  it('should fail for rejection and set general error', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.reject(mockResponse(404,
      JSON.stringify({ message: 'custom.error', scope: 'db' })))); // scope è ignorato
    await store.dispatch(deleteReservation('id-res'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_RESERVATIONS_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.RESERVATION_ADD_REMOVE_FAILURE,
      payload: { error: 'Qualcosa è andato storto. Per favore riprova' },
    });
  });

  it('should fail for timeout rejection', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.reject(new Error('timeout'))); // scope è ignorato
    await store.dispatch(deleteReservation('id-res'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_RESERVATIONS_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.RESERVATION_ADD_REMOVE_FAILURE,
      payload: { error: 'La connessione al server ha impiegato troppo tempo. Ti preghiamo di riprovare o attendere qualche minuto.' },
    });
  });

  it('should download user list', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify(['a', 'b']))));
    await store.dispatch(getUserList());
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.LOAD_FORM_DATA_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.LOAD_USERS_SUCCESS,
      payload: { json: ['a', 'b'] },
    });
  });

  it('should pass null json if DB is empty', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(404,
      JSON.stringify({ scope: 'db' }))));
    await store.dispatch(getUserList());
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.LOAD_FORM_DATA_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.LOAD_USERS_SUCCESS,
      payload: { json: null },
    });
  });

  it('should set error after failure in userslist', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(404,
      JSON.stringify({ message: 'help' }))));
    await store.dispatch(getUserList());
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.LOAD_FORM_DATA_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.LOAD_USERS_FAILURE,
      payload: { error: 'help' },
    });
  });

  it('should set error after failure in daymeals download', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(404,
      JSON.stringify({ message: 'help' }))));
    await store.dispatch(getDayMenu('2012-09-11', 'dinner'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.LOAD_FORM_DATA_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.LOAD_DAYMEALS_FAILURE,
      payload: { error: 'help' },
    });
  });

  it('should post a new reservation', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    const res = {
      id: 'qwew',
      user: { id: 'dsasa', name: 'dwww' },
      meals: [],
      date: '2017-03-04',
      hour: '24:45',
    };
    const risposta = { id: 'qwew', user: { id: 'dsasa', name: 'dwww' }, meals: [] };
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify(risposta))));
    await store.dispatch(postReservation(res));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.ADD_RESERVATION_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.ADD_RESERVATION_SUCCESS,
      payload: { json: risposta },
    });
  });

  it('should fail to post a new reservation and set error message from server', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    const res = {
      id: 'qwew',
      user: { id: 'dsasa', name: 'dwww' },
      meals: [],
      date: '2017-03-04',
      hour: '24:45',
    };
    const risposta = { message: '' };
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(404,
      JSON.stringify(risposta))));
    await store.dispatch(postReservation(res));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.ADD_RESERVATION_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.SHOW_RESERVATION_ERROR_FORM,
      payload: { error: '' },
    });
  });

  it('should reject promise for timeout and set error', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.reject(new Error('timeout')));
    await store.dispatch(postReservation({}));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.ADD_RESERVATION_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.SHOW_RESERVATION_ERROR_FORM,
      payload: { error: 'La connessione al server ha impiegato troppo tempo. Ti preghiamo di riprovare o attendere qualche minuto.' },
    });
  });
});
