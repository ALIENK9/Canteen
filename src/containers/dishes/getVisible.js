const getVisibleDishes = (dishes, filter) => {
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

export default getVisibleDishes;
