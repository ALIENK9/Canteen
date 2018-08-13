import Http from '../../Http';
import * as actionTypes from './menus.actionTypes';
import { getAuthFieldsFromStorage } from '../../utils';
import baseURLs from '../baseURLs';

export const toggleMeal = (id, value, moment) => ({
  type: actionTypes.TOGGLE_MEAL,
  payload: { id, value, moment },
});

export const fetchMenuStarted = () => ({
  type: actionTypes.FETCH_MENU_STARTED,
});

/* export const fetchMenuSuccess = json => ({
  type: actionTypes.FETCH_MENU_SUCCESS,
  payload: { json },
}); */

/* export const fetchDishesSuccess = json => ({
  type: actionTypes.FETCH_DISHES_SUCCESS,
  payload: { json },
}); */

export const fetchAllDataSuccess = (menu, dishes) => {
  const menuList = menu || { id: '', lunch: [], dinner: [] };
  const dishesList = dishes || [];
  console.log('DEUGB', menu, dishes);
  const ids = {
    lunch: (menu && menu.lunch && menu.lunch.map(el => el.id)) || [],
    dinner: (menu && menu.dinner && menu.dinner.map(el => el.id)) || [],
  };
  // prende da dishes solo quelli non già presenti nel menù
  const dinnerDishes = dishesList.filter(dish => !ids.lunch.includes(dish.id));
  const lunchDishes = dishesList.filter(dish => !ids.dinner.includes(dish.id));
  const entries = {
    id: menuList.id, // per la PUT
    lunch: [
      ...menuList.lunch,
      ...dinnerDishes,
    ],
    dinner: [
      ...menuList.dinner,
      ...lunchDishes,
    ],
  };
  console.log('TUTTI I PIATTI', entries);
  return {
    type: actionTypes.FETCH_ALL_SUCCESS,
    payload: { entries },
  };
};

export const fetchMenuFailure = error => ({
  type: actionTypes.FETCH_MENU_FAILURE,
  payload: { error },
});

export const postputMenuStarted = () => ({
  type: actionTypes.POST_MENU_STARTED,
});

export const postMenuSuccess = json => ({
  type: actionTypes.POST_MENU_SUCCESS,
  payload: { id: json.id },
});

export const putMenuSuccess = () => ({
  type: actionTypes.PUT_MENU_SUCCESS,
});

export const postputMenuFailure = error => ({
  type: actionTypes.POST_MENU_FAILURE,
  payload: { error },
});

export const deleteMenuSuccess = () => ({
  type: actionTypes.DELETE_MENU_SUCCESS,
});

export const deleteMenuFailure = () => ({
  type: actionTypes.DELETE_MENU_FAILURE,
  payload: { error: 'La cancellazione del menù è fallita. Riprova' },
});

export const clearMessages = () => ({
  type: actionTypes.CLEAR_MESSAGES,
});

export const changeSelectedMoment = moment => ({
  type: actionTypes.CHANGE_SELECTED_MOMENT,
  payload: { moment },
});


export const filterMeals = filter => ({
  type: actionTypes.FILTER_MEALS,
  payload: { filter },
});


// ASYNC

/* // VECCHIA CHE VANNO BENISSIMo
export const getAllDishes = json => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  const URL = baseURLs.dishes; // fetch dei piatti
  console.log('2econd', json);
  const menuData = {
    id: (json && json.id) || '', // serve per la PUT al submit
    dinner: (json && json.dinner) || [],
    lunch: (json && json.lunch) || [],
  };
  return Http.get(URL, headers, null, dispatch, fetchMenuStarted,
    fetchAllDataSuccess.bind(this, menuData), fetchMenuFailure);
};


 export const getAllData = date => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  const params = { date };
  const URL = baseURLs.menus; // fetch dei menù
  return Http.get(URL, headers, params, dispatch, fetchMenuStarted, getAllDishes,
    fetchMenuFailure);
}; */

export const getAllData = date => async (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  const params = { date };
  const menuURL = baseURLs.menus; // fetch previous menu
  const menumeals = await Http.get(menuURL, headers, params, dispatch, fetchMenuStarted);
  if (menumeals.failure) {
    dispatch(fetchMenuFailure(menumeals.error));
  } else {
    const dishesURL = baseURLs.dishes; // fetch all dishes
    const dishes = await Http.get(dishesURL, headers, null, dispatch, fetchMenuStarted);
    console.log('mega actions', dishes.error, dishes.data);
    if (dishes.failure) {
      dispatch(fetchMenuFailure(dishes.error));
    } else {
      dispatch(fetchAllDataSuccess(menumeals.data, dishes.data));
    }
  }
};

export const putMenus = meals => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  console.log('acction call data: ', meals, headers);
  const URL = baseURLs.menus;
  return meals.id
    ? Http.put(URL, headers, dispatch, JSON.stringify(meals), postputMenuStarted,
      putMenuSuccess, postputMenuFailure)
    : Http.post(URL, headers, dispatch, JSON.stringify(meals), postputMenuStarted,
      postMenuSuccess, postputMenuFailure);
};

export const deleteMenu = id => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  const URL = `${baseURLs.menus}/${id}`;
  return Http.delete(URL, headers, dispatch, postputMenuStarted, deleteMenuSuccess,
    deleteMenuFailure);
};
