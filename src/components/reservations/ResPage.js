import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwitcherView from './SwitcherView';
import Panel from '../Panel';
import TabsReservation from './TabsReservation';
import ReservationsList from './ReservationsList';
import UserList from './UserList';
// import { getReservations, deleteReservation } from '../../redux/actions/reservations.actions';

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
    const { list, match } = this.props;
    const { day } = match.params;
    return (
      <Panel title={`Prenotazioni del giorno ${day}`}>
        <SwitcherView activeKey={view === 'user' ? 2 : 1} onSelect={this.handleViewSelect} />
        <TabsReservation activeKey={moment === 'lunch' ? 1 : 2} onSelect={this.handleMomentSelect} />
        {console.log(list)}
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
};

ResPage.defaultProps = {
  list: [],
};

export default ResPage;
