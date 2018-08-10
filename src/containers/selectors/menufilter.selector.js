import { createSelector } from 'reselect';
import { FILTER_KEYS } from '../costants';

export const getFilter = state => state.ui.filter;
export const getMenu = state => state.data.entries;
export const getMoment = state => state.ui.moment;

const getVisibleMenu = createSelector(
  [getFilter, getMoment, getMenu],
  (visibilityFilter, moment, dishes) => {
    console.log('select', dishes, visibilityFilter, typeof visibilityFilter);
    switch (visibilityFilter) {
      case FILTER_KEYS.MAIN:
        return dishes[moment].filter(dish => dish.type === 1);
      case FILTER_KEYS.SECOND:
        return dishes[moment].filter(dish => dish.type === 2);
      case FILTER_KEYS.SIDE:
        return dishes[moment].filter(dish => dish.type === 3);
      case FILTER_KEYS.DESSERT:
        return dishes[moment].filter(dish => dish.type === 4);
      case 'ALL':
      default:
        return dishes[moment];
    }
  },
);

export default getVisibleMenu;
