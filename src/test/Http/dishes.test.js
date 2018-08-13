import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockResponse from './mockResponse';
import * as actions from '../../redux/actions/dishes/dishes.actionTypes';
import { getDishes, postDish } from '../../redux/actions/dishes/dishes.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Dishes async actions tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should get dishes list ', async () => {
    const store = mockStore({});
    const json = [
      {
        name: 'Nome piatto',
        type: 2,
        description: 'Ingredienti e descrizione',
        id: '13',
      },
      {
        name: 'Nome piatto 2',
        type: 2,
        description: '.... descrizione ... ',
        id: '15',
      },
    ];
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200,
      JSON.stringify(json))));
    await store.dispatch(getDishes());
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_DISHES_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.FETCH_DISHES_SUCCESS,
      payload: { json },
    });
  });


  it('should fail to get dishes and set server error', async () => {
    const store = mockStore({});
    const json = {
      message: 'Problema server', // errore server
    };
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(401,
      JSON.stringify(json))));
    await store.dispatch(getDishes());
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_DISHES_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.DISH_REQUEST_FAILURE,
      payload: { error: json.message },
    });
  });

  it('should fail to get dishes and set general error', async () => {
    const store = mockStore({});
    const json = {}; // nessun errore
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(401,
      JSON.stringify(json))));
    await store.dispatch(getDishes());
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_DISHES_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.DISH_REQUEST_FAILURE,
      payload: { error: 'La richiesta GET al server è fallita' },
    });
  });

  it('should fail for rejection of GET promise', async () => {
    const store = mockStore({});
    window.fetch = jest.fn().mockImplementation(() => Promise.reject());
    await store.dispatch(getDishes());
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_DISHES_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.DISH_REQUEST_FAILURE,
      payload: { error: 'Qualcosa è andato storto. Per favore riprova' },
    });
  });

  it('should not fail because of DB flag and 404 error', async () => {
    const store = mockStore({});
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(404,
      JSON.stringify({ // vuol dire che non ci sono risultati e non viene considerato un errore
        scope: 'db',
      }))));
    await store.dispatch(getDishes());
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_DISHES_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.FETCH_DISHES_SUCCESS,
      payload: { json: null },
    });
  });

  it('should post new dish with success', async () => {
    const store = mockStore({});
    const json = {
      name: 'Nuovo piatto nome',
      type: 2,
      description: 'Descrizione piatto',
    };
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200,
      JSON.stringify({
        ...json,
        id: '9876',
      }))));
    await store.dispatch(postDish(json));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.DISH_ADD_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.ADD_DISH_SUCCESS,
      payload: {
        dish: {
          ...json,
          id: '9876',
        },
      },
    });
  });

  it('should fail to post new dish and set server error', async () => {
    const store = mockStore({});
    const json = {
      name: 'Nuovo piatto nome',
      type: 2,
      description: 'Descrizione piatto',
    };
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(401,
      JSON.stringify({
        message: 'Errore server!',
      }))));
    await store.dispatch(postDish(json));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.DISH_ADD_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.SHOW_DISH_ERROR_FORM,
      payload: {
        error: 'Errore server!',
      },
    });
  });

  it('should fail to post new dish and set generic error', async () => {
    const store = mockStore({});
    const json = {
      name: 'Nuovo piatto nome',
      type: 2,
      description: 'Descrizione piatto',
    };
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(401,
      JSON.stringify({}))));
    await store.dispatch(postDish(json));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.DISH_ADD_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.SHOW_DISH_ERROR_FORM,
      payload: {
        error: 'Impossibile aggiungere i dati. Per favore riprova.',
      },
    });
  });

  it('should fail for rejection of POST promise', async () => {
    const store = mockStore({});
    const json = {
      name: 'Nuovo piatto nome',
      type: 2,
      description: 'Descrizione piatto',
    };
    window.fetch = jest.fn().mockImplementation(() => Promise.reject());
    await store.dispatch(postDish(json));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.DISH_ADD_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.SHOW_DISH_ERROR_FORM,
      payload: {
        error: 'Qualcosa è andato storto. Per favore riprova',
      },
    });
  });


  it('should fail timeout', async () => {
    const store = mockStore({});
    const json = {
      name: 'Nuovo piatto nome',
      type: 2,
      description: 'Descrizione piatto',
    };
    window.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('timeout')));
    await store.dispatch(postDish(json));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.DISH_ADD_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.SHOW_DISH_ERROR_FORM,
      payload: {
        error: 'La connessione al server ha impiegato troppo tempo. Ti preghiamo di riprovare o attendere qualche minuto.',
      },
    });
  });
});
