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
  const menuList = menu || { lunch: [], dinner: [] };
  console.log('DEUGB', menu, dishes);
  const ids = {
    lunch: (menu && menu.lunch && menu.lunch.map(el => el.id)) || [],
    dinner: (menu && menu.dinner && menu.dinner.map(el => el.id)) || [],
  };
  const dinnerDishes = dishes.filter(dish => !ids.lunch.includes(dish.id));
  const lunchDishes = dishes.filter(dish => !ids.dinner.includes(dish.id));
  const entries = {
    id: menu.id, // per la PUT
    lunch: [
      ...menuList.lunch,
      ...dinnerDishes,
    ],
    dinner: [
      ...menuList.dinner,
      ...lunchDishes,
    ],
  };
  console.log(entries);
  return {
    type: actionTypes.FETCH_ALL_SUCCESS,
    payload: { entries },
  };
};

export const fetchMenuFailure = error => ({
  type: actionTypes.FETCH_MENU_FAILURE,
  payload: { error },
});

export const postMenuStarted = () => ({
  type: actionTypes.POST_MENU_STARTED,
});

export const postMenuSuccess = () => ({
  type: actionTypes.POST_MENU_SUCCESS,
  payload: { success: 'Dati salvati correttamente' },
});

export const postMenuFailure = error => ({
  type: actionTypes.POST_MENU_FAILURE,
  payload: { error },
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
};


/* export const getMenu = date => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  const params = { date };
  const URL = baseURLs.menus;
  return Http.get(URL, headers, params, dispatch, fetchMenuStarted, fetchMenuSuccess,
    fetchMenuFailure);
}; */

export const putMenus = meals => (dispatch) => {
  const headers = getAuthFieldsFromStorage(); // Map
  console.log('acction call data: ', meals, headers);
  const URL = baseURLs.menus;
  return Http.put(URL, headers, dispatch, JSON.stringify(meals),
    postMenuStarted, postMenuSuccess, postMenuFailure);
};
