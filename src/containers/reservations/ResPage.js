import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SwitcherView from '../../components/reservations/SwitcherView';
import Panel from '../../components/Panel';
import TabsReservation from '../../components/reservations/TabsReservation';
import ReservationsList from '../../components/reservations/ReservationsList';
import UserList from '../../components/reservations/UserList';
import Alert from '../../components/Alert';
import { getReservations, deleteReservation, clearMessages } from '../../redux/actions/reservations.actions';

class ResPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'meals',
      moment: 'lunch',
    };
    this.handleMomentSelect = this.handleMomentSelect.bind(this);
    this.handleViewSelect = this.handleViewSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.handleViewSelect(1); // simula il click iniziale
  }

  handleMomentSelect(key) {
    const { getData } = this.props;
    const { view } = this.state;
    const moment = key === 1 ? 'lunch' : 'dinner';
    this.setState({ moment });
    getData(view, moment);
  }

  handleViewSelect(key) {
    const { getData } = this.props;
    const { moment } = this.state;
    const view = key === 1 ? 'meals' : 'users';
    this.setState({ view });
    getData(view, moment);
  }

  handleDelete(id) {
    const { onDelete } = this.props;
    const { moment } = this.state;
    onDelete(moment, id);
  }

  render() {
    const { moment, view } = this.state;
    const {
      list, match, error, closeAlert,
    } = this.props;
    const { day } = match.params;
    return (
      <Panel title={`Prenotazioni del giorno ${day}`}>
        <SwitcherView activeKey={view === 'user' ? 2 : 1} onSelect={this.handleViewSelect} />
        <TabsReservation activeKey={moment === 'lunch' ? 1 : 2} onSelect={this.handleMomentSelect} />
        {console.log(list)}
        { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
        { view === 'users' && <UserList list={list} moment={moment} onDelete={this.handleDelete} /> }
        { view === 'meals' && <ReservationsList list={list} /> }
      </Panel>
    );
  }
}

ResPage.propTypes = {
  match: PropTypes.object.isRequired,
  list: PropTypes.array,
  getData: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  closeAlert: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

ResPage.defaultProps = {
  list: [],
};

const mapStateToProps = state => ({
  list: state.reservations.list,
  error: state.reservations.error,
  success: state.reservations.success,
});

const mapDispatchToProps = dispatch => ({
  getData: (mode, moment) => dispatch(getReservations(mode, moment)),
  onDelete: (moment, id) => dispatch(deleteReservation(moment, id)),
  closeAlert: () => dispatch(clearMessages()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResPage));
