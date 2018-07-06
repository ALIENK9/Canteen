export const getVisibleDishes = (dishes, filter) => {
  switch (filter) {
    case 'MAIN':
      return dishes.filter(dish => dish.type === 'Primo');
    case 'SECOND':
      return dishes.filter(dish => dish.type === 'Secondo');
    case 'SIDE':
      return dishes.filter(dish => dish.type === 'Contorno');
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
  if (type === 1) return 'Primo';
  if (type === 2) return 'Secondo';
  if (type === 3) return 'Contorno';
  return 'Unknown';
};
