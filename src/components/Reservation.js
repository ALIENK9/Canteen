import React from 'react';
import PropTypes from 'prop-types';

const renderView = (viewList, reservations) => {
  if (viewList) {
    return (
      <ol>
        {
          reservations.map(item => (
            <li key={item}>
              {item}
            </li>
          ))
        }
      </ol>
    );
  }
  return (
    <p>
      Prenotazioni:
      {' '}
      {reservations.length}
    </p>
  );
};

const Reservation = ({
  name, reservations, viewList, onClick, index,
}) => (
  // <div className="flex-item card" role="button" tabIndex={0} onClick={() => onClick(index)} onKeyPress={() => onClick(index)}>
  <div>
    <span>
      {name}
    </span>
    { renderView(viewList, reservations) /* mostra la cosa giusta */ }
  </div>
  // </div>
);

Reservation.propTypes = {
  name: PropTypes.string.isRequired,
  reservations: PropTypes.arrayOf(PropTypes.string),
  viewList: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

Reservation.defaultProps = {
  reservations: [],
  viewList: false,
};

export default Reservation;
