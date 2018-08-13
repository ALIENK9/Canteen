import { Reducer } from 'redux-testkit';
import Immutable from 'seamless-immutable';
import menusReducer from '../../redux/reducers/menus/menus.reducer';
import {
  toggleMeal, fetchMenuStarted, fetchAllDataSuccess, fetchMenuFailure, postputMenuStarted,
  postMenuSuccess, putMenuSuccess, postputMenuFailure, deleteMenuSuccess, deleteMenuFailure,
  clearMessages, changeSelectedMoment, filterMeals,
} from '../../redux/actions/menus/menus.actions';

const initState = Immutable({
  data: {
    entries: {
      id: '',
      lunch: [],
      dinner: [],
    },
  },
  messages: {
    error: '',
    success: '',
  },
  ui: {
    loading: false,
    moment: 'lunch',
    filter: 'ALL',
  },
});

const lunch = [
  {
    name: 'Piatto 1',
    type: 2,
    id: '11212a',
    checked: false,
    description: 'sdfgh',
  },
  {
    name: 'Piatto 2',
    type: 4,
    id: '112ww12a',
    checked: true,
    description: 'sdfghq',
  },
];

const dishes = [
  {
    name: 'Dish 1',
    type: 1,
    id: '12345',
    description: 'sws',
  },
  {
    name: 'DessertDish',
    type: 4,
    id: '453d',
    description: 'sdfghq',
  },
];

const astate = Immutable({
  data: {
    entries: {
      id: 'qid',
      lunch,
      dinner: [],
    },
  },
  messages: {
    error: '',
    success: '',
  },
  ui: {
    loading: false,
    moment: 'lunch',
    filter: 'ALL',
  },
});


describe('Menus reducer tests', () => {
  it('should change checked attribute', () => {
    Reducer(menusReducer).withState(astate).expect(toggleMeal(lunch[1].id, false, 'lunch'))
      .toReturnState({
        ...astate,
        data: {
          entries: {
            ...astate.data.entries,
            lunch: [
              {
                name: 'Piatto 1',
                type: 2,
                id: '11212a',
                checked: false,
                description: 'sdfgh',
              },
              {
                name: 'Piatto 2',
                type: 4,
                id: '112ww12a',
                checked: false,
                description: 'sdfghq',
              },
            ],
          },
        },
      });
  });

  it('should set loading true', () => {
    Reducer(menusReducer).withState(initState).expect(fetchMenuStarted()).toReturnState({
      ...initState,
      ui: {
        ...initState.ui,
        loading: true,
      },
    });
  });

  it('should set entries after success', () => {
    const menu = {
      id: 'menu4ws',
      lunch,
      dinner: lunch,
    };
    Reducer(menusReducer).withState(initState).expect(fetchAllDataSuccess(menu, dishes))
      .toReturnState({
        ...initState,
        data: {
          entries: {
            id: 'menu4ws',
            lunch: [
              ...menu.lunch, // NOTE: conta l'ordine con lo spred op negli array
              ...dishes,
            ],
            dinner: [
              ...menu.dinner,
              ...dishes,
            ],
          },
        },
      });
  });

  it('should set entries after success without duplicates', () => {
    const menu = {
      id: 'menu4ws',
      lunch,
      dinner: [],
    };

    const mydishes = [
      {
        name: 'Piatto 2', // uguale ad uno di quelli in lunch
        type: 4,
        id: '112ww12a',
        description: 'sdfghq',
      },
      {
        name: 'ciao',
        type: 3,
        id: '22221j',
        description: '345678',
      },
    ];

    const expectedlunch = [...menu.lunch];
    expectedlunch.push(mydishes[1]); // tutti i dish meno il duplicato

    Reducer(menusReducer).withState(initState).expect(fetchAllDataSuccess(menu, mydishes))
      .toReturnState({
        ...initState,
        data: {
          entries: {
            id: 'menu4ws',
            lunch: expectedlunch,
            dinner: [
              ...menu.dinner,
              ...mydishes,
            ],
          },
        },
      });
  });

  it('should set errorafter menu fetch failure', () => {
    Reducer(menusReducer).expect(fetchMenuFailure('error2a')).toReturnState({
      ...initState,
      messages: {
        ...initState.messages,
        error: 'error2a',
      },
    });
  });

  it('should set loading after post/put start', () => {
    Reducer(menusReducer).expect(postputMenuStarted()).toReturnState({
      ...initState,
      ui: {
        ...initState.ui,
        loading: true,
      },
    });
  });

  it('should post success message after succesful post', () => {
    Reducer(menusReducer).expect(postMenuSuccess({ id: '2122' })).toReturnState({
      ...initState,
      data: {
        ...initState.data,
        entries: {
          id: '2122',
          lunch: [],
          dinner: [],
        },
      },
      messages: {
        ...initState.messages,
        success: 'Menù salvato con successo',
      },
    });
  });

  it('should put success message after succesful put', () => {
    Reducer(menusReducer).withState(astate).expect(putMenuSuccess()).toReturnState({
      ...astate,
      data: {
        ...astate.data,
        entries: {
          id: 'qid',
          lunch,
          dinner: [],
        },
      },
      messages: {
        ...astate.messages,
        success: 'Menù salvato con successo',
      },
    });
  });

  it('should set error for post/put failure', () => {
    Reducer(menusReducer).withState(astate).expect(postputMenuFailure('errore prova')).toReturnState({
      ...astate,
      messages: {
        ...astate.messages,
        error: 'errore prova',
      },
    });
  });

  it('should reset all checked attributes after delete success', () => {
    const mystate = Immutable({
      ...astate,
      data: {
        entries: {
          ...astate.data.entries,
          dinner: dishes,
        },
      },
    });
    Reducer(menusReducer).withState(mystate).expect(deleteMenuSuccess()).toReturnState({
      ...mystate,
      data: {
        ...mystate.data,
        entries: {
          id: '',
          lunch: mystate.data.entries.lunch.map(e => ({ ...e, checked: false })),
          dinner: mystate.data.entries.dinner.map(e => ({ ...e, checked: false })),
        },
      },
    });
  });

  it('should set error message after menu deletion failure', () => {
    Reducer(menusReducer).withState(astate).expect(deleteMenuFailure()).toReturnState({
      ...astate,
      messages: {
        ...astate.messages,
        error: 'La cancellazione del menù è fallita. Riprova',
      },
    });
  });

  it('should clear all error and success messages', () => {
    const mystate = Immutable({
      ...astate,
      messages: {
        success: 'success hola',
        error: 'errewsss',
      },
    });
    Reducer(menusReducer).withState(mystate).expect(clearMessages()).toReturnState({
      ...astate,
      messages: {
        success: '',
        error: '',
      },
    });
  });

  it('should change selected moment', () => {
    Reducer(menusReducer).withState(initState).expect(changeSelectedMoment('dinner')).toReturnState({
      ...initState,
      ui: {
        ...initState.ui,
        moment: 'dinner',
      },
    });
  });

  it('should set filter meals', () => {
    Reducer(menusReducer).expect(filterMeals('MAIN')).toReturnState({
      ...initState,
      ui: {
        ...initState.ui,
        filter: 'MAIN',
      },
    });
  });
});
