import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

/**
 * Render the list of reservations or the numbero of reservations, depending on bool param
 * @param {bool} viewList
 * @param {Array} reslist
 */
const renderView = (viewList, reslist, dish, id) => (
  <React.Fragment>
    <p>
      Prenotazioni:
      {' '}
      {reslist.length}
    </p>
    {viewList && (
    <Table
      title={`Tabella di utenti che hanno prenotato il piatto ${dish}`}
      hover
    >
      <caption className="accessibility">
        Utenti che hanno prenotato il piatto
        {' '}
        {dish}
        . La prima colonna contiene il nome e la seconda l&apos;orario a cui ha effettuato
        la prenotazione
      </caption>
      <thead>
        <tr>
          <th scope="col" id={`user-name-${id}`}>
            Nome
          </th>
          <th scope="col" id={`user-hour-${id}`}>
            Orario
          </th>
        </tr>
      </thead>
      <tbody>
        {reslist.map(item => (
          <tr key={item.id}>
            <td headers={`user-name-${id}`}>
              {item.name}
            </td>
            <td headers={`user-hour-${id}`}>
              {item.hour}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    )}
  </React.Fragment>
);

/**
 * Component to render reservations for one meal
 * @param {Object} props
 */
const ReservationItem = ({
  id, name, type, reslist, clicked,
}) => (
  <div className="card-container center">
    <strong>
      {name}
    </strong>
    <div className="card-subtitle">
      {type}
    </div>
    { renderView(clicked, reslist, name, id)
      /* mostra la cosa giusta a seconda del parametro 'viewList' */ }
  </div>
);

ReservationItem.propTypes = {
  id: PropTypes.string.isRequired, // id del piatto (per la tabella)
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  reslist: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hour: PropTypes.string,
  })),
  clicked: PropTypes.bool,
};

ReservationItem.defaultProps = {
  reslist: [],
  clicked: false,
};

export default ReservationItem;
