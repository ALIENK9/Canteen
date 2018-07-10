import React from 'react';
import {
  Tab, Tabs,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const SwitcherView = ({ activeKey, onSelect }) => (
  <Tabs defaultActiveKey={activeKey} onSelect={onSelect} id="switch-view-tabs">
    <Tab eventKey={1} title="Vista pasti" />
    <Tab eventKey={2} title="Vista utenti" />
  </Tabs>
);

SwitcherView.propTypes = {
  activeKey: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SwitcherView;
