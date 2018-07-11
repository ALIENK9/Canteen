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
const ReservationItem = ({
  name, type, reslist, viewList,
}) => (
  <div className="w3-container w3-center">
    <strong>
      {name}
    </strong>
    <div className="card-subtitle">
      {type}
    </div>
    { renderView(viewList, reslist) /* mostra la cosa giusta a seconda del parametro 'viewList' */ }
  </div>
);

ReservationItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  reslist: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    hour: PropTypes.string,
  })),
  viewList: PropTypes.bool,
};

ReservationItem.defaultProps = {
  reslist: [],
  viewList: false,
};

export default ReservationItem;
