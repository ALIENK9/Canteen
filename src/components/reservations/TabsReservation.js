import React from 'react';
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

export default TabsReservation;
