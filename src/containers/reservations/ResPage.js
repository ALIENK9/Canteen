import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Panel } from 'react-bootstrap';
import MyPanel from '../../components/Panel';
import ReservationsList from './ReservationsList';
import UserList from './UserList';
import Alert from '../../components/Alert';
import { clearMessages } from '../../redux/actions/reservations/reservations.actions';
import AddReservationModal from './AddReservationModal';
import ResToolbar from './ResToolbar';
import Loader from '../../components/Loader';
import ViewTabs from './ViewTabs';
import MomentTabs from './MomentTabs';
import { mapMomentToString } from '../utils';

const ResPage = ({
  match, error, closeAlert, view, loading, history, moment, list,
}) => {
  const { day } = match.params;
  return (
    <MyPanel title={`Prenotazioni del giorno ${day}`} history={history}>
      <Panel bsStyle="primary">
        <Panel.Heading>
          <DocumentTitle title={`Prenotazioni ${day} | Servizio mensa`} />
          <ViewTabs />
          <MomentTabs />
        </Panel.Heading>
        <Panel.Body>
          <p>
            Queste sono le prenotazioni effettuate per la giornata
            {' '}
            {day}
            {' '}
            a
            {' '}
            {mapMomentToString(moment)}
            .
            <br />
            Dalla scheda
            {' '}
            <em>
              Vista utenti
            </em>
            {' '}
            puoi aggiungere ed eliminare prenotazioni degli utenti. Dalla schermata
            {' '}
            <em>
              Vista pasti
            </em>
            {' '}
            puoi invece visualizzare i dettagli sul numero di piatti prenotati.
          </p>
          <ResToolbar view={view} list={list} />
          <Loader loading={loading} />
          <AddReservationModal day={day} />
          { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
          { view === 'users' && <UserList day={day} /> }
          { view === 'meals' && <ReservationsList day={day} /> }
        </Panel.Body>
      </Panel>
    </MyPanel>
  );
};

ResPage.propTypes = {
  match: PropTypes.object.isRequired,
  closeAlert: PropTypes.func.isRequired,
  error: PropTypes.string,
  view: PropTypes.oneOf(['users', 'meals']),
  history: PropTypes.object,
  moment: PropTypes.oneOf(['lunch', 'dinner']),
  loading: PropTypes.bool,
  list: PropTypes.array,
};

ResPage.defaultProps = {
  error: '',
  view: 'meals',
  history: null,
  moment: 'lunch',
  loading: true,
  list: [],
};

const mapStateToProps = state => ({
  list: state.reservations.data.list,
  error: state.reservations.messages.error,
  view: state.reservations.ui.view,
  loading: state.reservations.ui.loading,
  moment: state.reservations.ui.moment,
});

const mapDispatchToProps = dispatch => ({
  closeAlert: () => dispatch(clearMessages()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResPage));
