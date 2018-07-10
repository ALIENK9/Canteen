import React from 'react';
import PropTypes from 'prop-types';

const UserReservationItem = ({ name, hour, meals }) => (
  <div className="w3-container w3-center">
    <strong>
      {name}
    </strong>
    <div className="card-subtitle">
      {hour}
    </div>
    <ul>
      {meals && meals.map(meal => (
        <li key={meal}>
          {meal}
        </li>
      )) }
    </ul>
  </div>
);

UserReservationItem.propTypes = {
  name: PropTypes.string,
  hour: PropTypes.string,
  meals: PropTypes.arrayOf(PropTypes.string),
};

UserReservationItem.defaultProps = {
  name: '',
  hour: '00:00',
  meals: [],
};

export default UserReservationItem;
