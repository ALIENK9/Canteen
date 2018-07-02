import * as actionTypes from '../actionTypes';
import menu from '../../data/menu.json';

export const fetchData = () => ({
  type: actionTypes.FETCH_MENU_DATA,
  payload: menu,
});

export const toggleMeal = (index, value) => ({
  type: actionTypes.TOGGLE_MEAL,
  payload: { index, value },
});

export const filterData = () => {

};
