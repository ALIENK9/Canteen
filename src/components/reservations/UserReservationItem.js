import React from 'react';
import PropTypes from 'prop-types';

const UserReservationItem = ({ name, hour, meals }) => (
  <div className="w3-container w3-center">
    {console.log('Meals array in userresItem', meals)}
    <strong>
      {name}
    </strong>
    <div className="card-subtitle">
      {hour}
    </div>
    <ul>
      {meals && meals.map(meal => (
        <li key={meal.id}>
          {meal.name}
        </li>
      )) }
    </ul>
  </div>
);

UserReservationItem.propTypes = {
  name: PropTypes.string,
  hour: PropTypes.string,
  meals: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })),
};

UserReservationItem.defaultProps = {
  name: '',
  hour: '00:00',
  meals: [],
};

export default UserReservationItem;
