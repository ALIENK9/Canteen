import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockResponse from './mockResponse';
import * as actions from '../../redux/actions/menus/menus.actionTypes';
import { getAllData, putMenus, deleteMenu } from '../../redux/actions/menus/menus.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test menus async actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const menu = {
    id: '1234567',
    lunch: [
      {
        name: 'Piatto 1',
        type: 2,
        id: '11212a',
        checked: true,
        description: 'sdfgh',
      },
      {
        name: 'Piatto 2',
        type: 4,
        id: '112ww12a',
        checked: true,
        description: 'sdfghq',
      },
    ],
    dinner: [
      {
        name: 'Piatto 1',
        type: 2,
        id: '11212a',
        checked: true,
        description: 'sdfgh',
      },
      {
        name: 'Dessert',
        type: 4,
        id: 'wdsdww22',
        checked: true,
        description: 'Dessert buono',
      },
    ],
  };

  it('should getAlldata successfully', async () => {
    const store = mockStore({});
    const dishes = [
      {
        name: 'Dish 1',
        type: 1,
        id: '12345',
        description: 'sws',
      },
      {
        name: 'Dessert',
        type: 4,
        id: 'wdsdww22',
        description: 'Dessert buono',
      },
    ];
    const expectedEntries = {
      ...menu,
      lunch: [
        ...menu.lunch,
        ...dishes,
      ],
      dinner: [
        ...[...menu.dinner, {
          name: 'Dish 1',
          type: 1,
          id: '12345',
          description: 'sws',
        }],
      ],
    };
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify(menu))));
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify(dishes))));
    await store.dispatch(getAllData('2018-08-08'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(3);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_MENU_STARTED });
    expect(expectedActions[1]).toEqual({ type: actions.FETCH_MENU_STARTED });
    expect(expectedActions[2]).toEqual({
      type: actions.FETCH_ALL_SUCCESS,
      payload: {
        entries: expectedEntries,
      },
    });
  });

  it('should fetch data dealing with empty dishes DB error showing only menu dishes', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify(menu))));
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(404,
      JSON.stringify({ message: 'DB vuoto', scope: 'db' })))); // il messaggio è inutile
    await store.dispatch(getAllData('2018-08-09'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(3);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_MENU_STARTED });
    expect(expectedActions[1]).toEqual({ type: actions.FETCH_MENU_STARTED });
    expect(expectedActions[2]).toEqual({
      type: actions.FETCH_ALL_SUCCESS,
      payload: {
        entries: { id: '1234567', lunch: menu.lunch, dinner: menu.dinner },
      },
    });
  });

  it('should fetch data dealing with empty DB error cause menu is empty', async () => {
    const store = mockStore({});
    const dishes = [
      {
        name: 'Dish 1',
        type: 1,
        id: '12345',
        description: 'sws',
      },
      {
        name: 'Dessert',
        type: 4,
        id: 'wdsdww22',
        description: 'Dessert buono',
      },
    ];
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(404,
      JSON.stringify({ scope: 'db' }))));
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify(dishes))));
    await store.dispatch(getAllData('2018-08-09'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(3);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_MENU_STARTED });
    expect(expectedActions[1]).toEqual({ type: actions.FETCH_MENU_STARTED });
    expect(expectedActions[2]).toEqual({
      type: actions.FETCH_ALL_SUCCESS,
      payload: {
        entries: { id: '', lunch: dishes, dinner: dishes },
      },
    });
  });

  it('should show empty array if both menus and dishes are empty', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(404,
      JSON.stringify({ scope: 'db' }))));
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(404,
      JSON.stringify({ scope: 'db' }))));
    await store.dispatch(getAllData('2018-08-09'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(3);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_MENU_STARTED });
    expect(expectedActions[1]).toEqual({ type: actions.FETCH_MENU_STARTED });
    expect(expectedActions[2]).toEqual({
      type: actions.FETCH_ALL_SUCCESS,
      payload: {
        entries: { id: '', lunch: [], dinner: [] },
      },
    });
  });

  it('should post new menu', async () => {
    const store = mockStore({});
    const meals = {
      ...menu,
      id: '', // null id perchè non esiste questo menù
    };
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify({ ...meals, id: 'qwq11' })))); // la response fornisce l'ID del menù
    await store.dispatch(putMenus(meals));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.POST_MENU_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.POST_MENU_SUCCESS,
      payload: { id: 'qwq11' },
    });
  });

  it('should put new menu overwriting previous ignoring response id', async () => {
    const store = mockStore({ entries: {} });
    const meals = {
      ...menu,
      id: 'qw11111',
    };
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify({ ...meals, id: 'qwq11' })))); // questo ID dovrebbe essere ignorato
    await store.dispatch(putMenus(meals));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.POST_MENU_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.PUT_MENU_SUCCESS,
    });
  });

  it('should fail fetching all data for menus', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(401,
      JSON.stringify({ message: 'Errore del server!' }))));
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify([
        {
          name: '', type: 1, id: '222', description: 'd',
        },
      ]))));
    await store.dispatch(getAllData('2018.-04-12'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_MENU_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.FETCH_MENU_FAILURE,
      payload: { error: 'Errore del server!' },
    });
  });

  it('should fail fetching data with rejection error', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify(menu))));
    window.fetch.mockImplementationOnce(() => Promise.reject(mockResponse(200,
      JSON.stringify([
        {
          name: '', type: 1, id: '222', description: 'd',
        },
      ]))));
    await store.dispatch(getAllData());
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(3);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_MENU_STARTED });
    expect(expectedActions[1]).toEqual({ type: actions.FETCH_MENU_STARTED });
    expect(expectedActions[2]).toEqual({
      type: actions.FETCH_MENU_FAILURE,
      payload: { error: 'Qualcosa è andato storto. Per favore riprova' },
    });
  });

  it('should fail fetching data with generic error if server doesn\'t provide it', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify(menu))));
    window.fetch.mockImplementationOnce(() => Promise.reject(mockResponse(404,
      JSON.stringify({ no_message: null, scope: 'no_db' })))); // risposta senza messaggio valido
    await store.dispatch(getAllData());
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(3);
    expect(expectedActions[0]).toEqual({ type: actions.FETCH_MENU_STARTED });
    expect(expectedActions[1]).toEqual({ type: actions.FETCH_MENU_STARTED });
    expect(expectedActions[2]).toEqual({
      type: actions.FETCH_MENU_FAILURE,
      payload: { error: 'Qualcosa è andato storto. Per favore riprova' },
    });
  });

  it('should fail posting new menu data with server error', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(401,
      JSON.stringify({ message: 'Errore del server nella POST' }))));
    await store.dispatch(putMenus({ ...menu, id: '' }));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.POST_MENU_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.POST_MENU_FAILURE,
      payload: { error: 'Errore del server nella POST' },
    });
  });

  it('should fail posting new menu data with timeout error', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.reject(new Error('timeout')));
    await store.dispatch(putMenus({ ...menu, id: '' }));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.POST_MENU_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.POST_MENU_FAILURE,
      payload: { error: 'La connessione al server ha impiegato troppo tempo. Ti preghiamo di riprovare o attendere qualche minuto.' },
    });
  });

  it('should fail posting new menu data with generic error', async () => {
    const store = mockStore({});
    window.fetch = jest.fn();
    window.fetch.mockImplementationOnce(() => Promise.resolve(mockResponse(401,
      JSON.stringify({ message: 'POST error' }))));
    await store.dispatch(putMenus({ ...menu, id: '' }));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.POST_MENU_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.POST_MENU_FAILURE,
      payload: { error: 'POST error' },
    });
  });

  it('should delete a menù by id', async () => {
    const store = mockStore({});
    window.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve(mockResponse(200,
      JSON.stringify({}))));
    await store.dispatch(deleteMenu('20'));
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(2);
    expect(expectedActions[0]).toEqual({ type: actions.POST_MENU_STARTED });
    expect(expectedActions[1]).toEqual({
      type: actions.DELETE_MENU_SUCCESS,
    });
  });
});
