import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Panel from '../../components/Panel';
import ReservationsList from './ReservationsList';
import UserList from './UserList';
import Alert from '../../components/Alert';
import { clearMessages, changeSelectedMoment, changeSelectedView } from '../../redux/actions/reservations/reservations.actions';
import AddReservationModal from './AddReservationModal';
import Tabs from '../../components/Tabs';
import ResToolbar from './ResToolbar';

// REVIEW: togliere logs

class ResPage extends Component {
  constructor(props) {
    super(props);
    this.handleMomentChange = this.handleMomentChange.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  componentDidMount() { // due tab sono inizialmente cliccati
    this.handleMomentChange(1);
    this.handleViewChange(1);
  }

  // NOTE: Funzioni per controllare i Tabs. Lasciarli componenti controllati
  handleViewChange(key) {
    const { onViewChange } = this.props;
    const newView = key === 1 ? 'meals' : 'users';
    onViewChange(newView);
  }

  handleMomentChange(key) {
    const { onMomentChange } = this.props;
    const newMom = key === 1 ? 'lunch' : 'dinner';
    onMomentChange(newMom);
  }


  render() {
    const {
      match, error, closeAlert, view, moment,
    } = this.props;
    const { day } = match.params;
    const views = ['Vista pasti', 'Vista utenti'];
    const moments = ['Pranzo', 'Cena'];
    /* const toolbarConfig = {
      buttons: [],
      add: {
        presence: true,
        func:
      },
    }; */
    return (
      <Panel title={`Prenotazioni del giorno ${day}`}>
        <Tabs tabs={views} activeKey={view === 'meals' ? 1 : 2} onSelect={this.handleViewChange} />
        <Tabs tabs={moments} activeKey={moment === 'lunch' ? 1 : 2} onSelect={this.handleMomentChange} />
        <ResToolbar view={view} />
        <AddReservationModal />
        {console.log('Res Page view ', view)}
        { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
        { view === 'users' && <UserList /> }
        { view === 'meals' && <ReservationsList /> }
      </Panel>
    );
  }
}


/* const ResPage = ({
  match, error, closeAlert, view, list,
}) => {
  const { day } = match.params;
  const views = ['Vista pasti', 'Vista utenti'];
  const moments = ['Pranzo', 'Cena'];
  return (
    <Panel title={`Prenotazioni del giorno ${day}`}>
      <SwitcherView tabs={views} />
      <SwitcherMoment tabs={moments} />
      <AddReservationModal />
      {console.log('Res Page view ', view)}
      { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
      { view === 'users' && <UserList list={list} /> }
      { view === 'meals' && <ReservationsList list={list} /> }
    </Panel>
  );
}; */


ResPage.propTypes = {
  match: PropTypes.object.isRequired,
  // getData: PropTypes.func.isRequired,
  // onDelete: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
  error: PropTypes.string,
  view: PropTypes.oneOf(['users', 'meals']),
  moment: PropTypes.oneOf(['lunch', 'dinner']),
  onViewChange: PropTypes.func.isRequired,
  onMomentChange: PropTypes.func.isRequired,
};

ResPage.defaultProps = {
  error: '',
  view: 'meals',
  // success: '',
  moment: 'lunch',
};

const mapStateToProps = state => ({
  list: state.reservations.data.list,
  error: state.reservations.messages.error,
  view: state.reservations.ui.view,
  // success: state.reservations.success,
});

const mapDispatchToProps = dispatch => ({
  // getData: (mode, moment) => dispatch(getReservations(mode, moment)),
  // onDelete: (moment, id) => dispatch(deleteReservation(moment, id)),
  closeAlert: () => dispatch(clearMessages()),
  onMomentChange: moment => dispatch(changeSelectedMoment(moment)),
  onViewChange: view => dispatch(changeSelectedView(view)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResPage));
