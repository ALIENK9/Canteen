import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ReservationsList from '../containers/ReservationsList';

const TabsReservation = () => (
  <Tabs defaultActiveKey={2} id="uncontrolled-tab">
    <Tab eventKey={1} title="Pranzo">
      <ReservationsList type="Pranzo" />
    </Tab>
    <Tab eventKey={2} title="Cena">
      <ReservationsList type="Cena" />
    </Tab>
  </Tabs>
);

export default TabsReservation;
