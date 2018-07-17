// @deprecated da MenusPage e Tabs

import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
// import MenuList from '../containers/MenuList';

const TabsMenu = () => (
  <Tabs defaultActiveKey={1} id="uncontrolled-tab">
    <Tab eventKey={1} title="Pranzo">
      <MenuList moment="lunch" />
    </Tab>
    <Tab eventKey={2} title="Cena">
      <MenuList moment="dinner" />
    </Tab>
  </Tabs>
);

export default TabsMenu;
