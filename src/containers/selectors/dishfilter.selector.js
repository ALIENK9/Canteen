import { createSelector } from 'reselect';
import { FILTER_KEYS } from '../costants';

export const getFilter = state => state.ui.filter;
export const getDishes = state => state.data.list;
export const getSearchKey = state => state.ui.searchtext;

const getVisibleDishes = createSelector(
  [getFilter, getDishes],
  (visibilityFilter, dishes) => {
    switch (visibilityFilter) {
      case FILTER_KEYS.MAIN:
        return dishes.filter(dish => dish.type === 1);
      case FILTER_KEYS.SECOND:
        return dishes.filter(dish => dish.type === 2);
      case FILTER_KEYS.SIDE:
        return dishes.filter(dish => dish.type === 3);
      case FILTER_KEYS.DESSERT:
        return dishes.filter(dish => dish.type === 4);
      case 'ALL':
      default:
        return dishes;
    }
  },
);

const getSearchedDishes = createSelector(
  [getSearchKey, getDishes],
  (id, dishes) => {
    if (!id) return dishes;
    const result = dishes.find(dish => dish.id === id);
    return result ? [result] : [];
  },
);


const getSearchedVisibleDishes = createSelector(
  [getSearchedDishes, getVisibleDishes],
  (searched, visible) => {
    const ids = searched.map(i => i.id);
    return visible.filter(item => ids.includes(item.id));
  },
);

export default getSearchedVisibleDishes;
