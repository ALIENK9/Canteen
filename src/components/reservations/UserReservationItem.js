import React from 'react';
import PropTypes from 'prop-types';

const UserReservationItem = ({ name, hour, meals }) => (
  <div className="card-container center">
    <strong>
      {name}
    </strong>
    <div className="card-subtitle">
      {hour}
    </div>
    {meals && Array.isArray(meals) && (
      <ul>
        {meals.map(meal => (
          <li key={meal.id}>
            {meal.name}
          </li>
        )) }
      </ul>
    )}
  </div>
);

UserReservationItem.propTypes = {
  name: PropTypes.string,
  hour: PropTypes.string,
  meals: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  })),
};

UserReservationItem.defaultProps = {
  name: '',
  hour: '00:00',
  meals: null,
};

export default UserReservationItem;
