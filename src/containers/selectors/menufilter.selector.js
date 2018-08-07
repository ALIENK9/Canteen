import { createSelector } from 'reselect';

export const getFilter = state => state.ui.filter;
export const getMenu = state => state.data.entries;
export const getMoment = state => state.ui.moment;

const getVisibleMenu = createSelector(
  [getFilter, getMoment, getMenu],
  (visibilityFilter, moment, dishes) => {
    console.log('select', dishes, visibilityFilter, typeof visibilityFilter);
    switch (visibilityFilter) {
      case 'MAIN':
        return dishes[moment].filter(dish => dish.type === 1);
      case 'SECOND':
        return dishes[moment].filter(dish => dish.type === 2);
      case 'SIDE':
        return dishes[moment].filter(dish => dish.type === 3);
      case 'ALL':
      default:
        return dishes[moment];
    }
  },
);

export default getVisibleMenu;
