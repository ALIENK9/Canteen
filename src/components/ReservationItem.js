import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

/**
 * Render the list of reservations or the numbero of reservations, depending on bool param
 * @param {bool} viewList
 * @param {Array} reslist
 */
const renderView = (viewList, reslist) => {
  if (viewList) {
    return (
      <Table hover>
        <thead>
          <tr>
            <th>
              Nome
            </th>
            <th>
              Orario
            </th>
          </tr>
        </thead>
        <tbody>
          {reslist.map(item => (
            <tr key={item.name}>
              <td>
                {item.name}
              </td>
              <td>
                {item.hour}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  return (
    <p>
      Prenotazioni:
      {' '}
      {reslist.length}
    </p>
  );
};

/**
 * Component to render reservations for one meal
 * @param {Object} props
 */
const Reservation = ({
  name, reslist, viewList,
}) => (
  <div>
    <h3>
      {name}
    </h3>
    { renderView(viewList, reslist) /* mostra la cosa giusta a seconda del parametro 'viewList' */ }
  </div>
);

Reservation.propTypes = {
  name: PropTypes.string.isRequired,
  reslist: PropTypes.arrayOf(PropTypes.string),
  viewList: PropTypes.bool,
};

Reservation.defaultProps = {
  reslist: [],
  viewList: false,
};

export default Reservation;
