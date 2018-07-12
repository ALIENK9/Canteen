/* import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeSelectedMoment, getReservations, changeTab }
  from '../../redux/actions/reservations/reservations.actions';
import Tabs from '../../components/Tabs';

const mapStateToProps = state => ({
  activeKey: state.reservations.ui.moment === 'lunch' ? 1 : 2,
  view: state.reservations.ui.view,
  moment: state.reservations.ui.moment,
});

const mapDispatchToProps = dispatch => ({
  // onSelect: (view, key) => dispatch(changeTab(view, key === 1 ? 'lunch' : 'dinner')),
});

// //const SwitcherMoment = withRouter(connect(mapStateToProps, mapDispatchToProps)(Tabs));
// export default SwitcherMoment;


/* import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types';


const TabsReservation = ({ activeKey, onSelect }) => (
  <Tabs defaultActiveKey={activeKey} onSelect={onSelect} id="reservation-moment-tab">
    <Tab eventKey={1} title="Pranzo" />
    <Tab eventKey={2} title="Cena" />
  </Tabs>
);

TabsReservation.propTypes = {
  activeKey: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default TabsReservation; */
