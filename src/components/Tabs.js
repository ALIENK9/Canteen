import React from 'react';
import {
  Tab, Tabs as BTabs,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

/* eslint-disable react/no-array-index-key */
/* class Tabs extends React.Component {

  render() {
    const {
      tabs, activeKey, onSelect,
    } = this.props;
    return (
      <BTabs defaultActiveKey={activeKey} onSelect={key => onSelect(key)} id="component-tabs">
        {tabs.map((title, index) => (
          <Tab key={index} eventKey={index + 1} title={title}>
            {console.log('tabs', index + 1, title)}
          </Tab>
        ))}
      </BTabs>
    );
  }
} */

const Tabs = ({
  tabs, activeKey, onSelect,
}) => (
  <BTabs defaultActiveKey={activeKey} onSelect={onSelect} id="component-tabs">
    {tabs.map((title, index) => (
      <Tab eventKey={index + 1} key={title} title={title} />
    ))}
  </BTabs>
);

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeKey: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};


export default Tabs;
