import jwt from 'jsonwebtoken';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout } from '../../redux/actions/authentication/authentication.actions';
import mockResponse from './mockResponse';
import * as actions from '../../redux/actions/authentication/authentication.actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authenticatione async actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  /* const astate = {
    user: {
      name: '',
      admin: false,
      token: '',
    },
    messages: {
      error: '',
      success: '',
    },
    ui: {
      loading: false,
    },
    isAuthenticated: false,
  }; */

  it('should perform login action and set user', async () => {
    const store = mockStore({});
    const returnedUser = {
      name: 'Pippo', admin: true, id: 'pippoID',
    };
    const token = jwt.sign(returnedUser, 'chiave');
    const decToken = jwt.decode(token);
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200,
      JSON.stringify({
        token,
      }))));
    await store.dispatch(login({ username: 'pippo@ciao.it', password: 'pippo' }));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.LOGIN_REQUEST });
    expect(expectedActions[1]).toEqual({
      type: actions.SET_CURRENT_USER,
      payload: {
        user: {
          ...decToken,
          token,
        },
      },
    });
  });

  it('should fail login action and set server error and empty user', async () => {
    const store = mockStore({});
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(401,
      JSON.stringify({
        message: 'Login invalido', // testa se riceve errore dal server
      }))));
    await store.dispatch(login({ username: 'pippo@ciao.it', password: 'pippo' }));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.LOGIN_REQUEST });
    expect(expectedActions[1]).toEqual({
      type: actions.LOGIN_FAILURE,
      payload: {
        error: 'Login invalido',
      },
    });
  });

  it('should fail login and set general error', async () => {
    const store = mockStore({});
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(401,
      JSON.stringify({}))));
    // testa cosa succede se non riceve errore dal server perchè il body è VUOTO
    await store.dispatch(login({ username: 'pippo@ciao.it', password: 'pippo' }));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.LOGIN_REQUEST });
    expect(expectedActions[1]).toEqual({
      type: actions.LOGIN_FAILURE,
      payload: {
        error: 'Impossibile completare la richiesta. Riprova o attendi qualche minuto',
      },
    });
  });

  it('should logout and set empty user', async () => {
    const store = mockStore({});
    await store.dispatch(logout());
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(1);
    expect(expectedActions).toContainEqual({
      type: actions.SET_CURRENT_USER,
      payload: { user: {} },
    });
  });
});
