export const getVisibleDishes = (dishes, filter) => {
  switch (filter) {
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
};

export const compareDishes = (a, b) => {
  if (a.type < b.type) return -1;
  return 1;
};

export const mapTypeToString = (type) => {
  switch (type) {
    case 1:
      return 'Primo';
    case 2:
      return 'Secondo';
    case 3:
      return 'Contorno';
    default:
      return 'Unknown';
  }
};
