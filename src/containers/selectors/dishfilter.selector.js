import { createSelector } from 'reselect';

export const getFilter = state => state.ui.filter;
export const getDishes = state => state.data.list;

const getVisibleDishes = createSelector(
  [getFilter, getDishes],
  (visibilityFilter, dishes) => {
    switch (visibilityFilter) {
      case 'MAIN':
        return dishes.filter(dish => dish.type === 1);
      case 'SECOND':
        return dishes.filter(dish => dish.type === 2);
      case 'SIDE':
        return dishes.filter(dish => dish.type === 3);
      case 'ALL':
      default:
        return dishes;
    }
  },
);

export default getVisibleDishes;
