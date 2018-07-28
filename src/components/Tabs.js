import React from 'react';
import {
  Nav, NavItem,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Renders a tab navbar with provided tabs. Allow style customization via 'classes' prop
 * @param {Object} props An Object with {tabs: ArrayOf({key, title}),
 *  activeKey: any, onSelect: func, classes: string}
 */
const Tabs = ({
  tabs, activeKey, onSelect, classes,
}) => (
  <Nav bsStyle="tabs" activeKey={activeKey} onSelect={onSelect} className={`tab-inline-block ${classes}`}>
    {console.log('Active tab', activeKey)}
    {tabs.map(tab => (
      <NavItem eventKey={tab.key} key={tab.key} title={tab.title}>
        {tab.title}
      </NavItem>
    ))}
  </Nav>
);


Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    key: PropTypes.any,
  })).isRequired,
  activeKey: PropTypes.any.isRequired,
  onSelect: PropTypes.func.isRequired,
  classes: PropTypes.string.isRequired,
};


export default Tabs;


// VECCHIA STRADA
/* <div className="tabsbar">
    <Nav bsStyle="tabs" activeKey={activeKeys.set1}
    onSelect={onSelect.set1} className="tab-inline-block">
      {console.log('Set 1 active tab', activeKeys.set1)}
      {tabs.set1.map(tab => (
        <NavItem eventKey={tab.key} key={tab.key} title={tab.title}>
          {tab.title}
        </NavItem>
      ))}
    </Nav>
    {tabs.set2 && (
    <Nav bsStyle="tabs" activeKey={activeKeys.set2}
    onSelect={onSelect.set2} className="pull-right tab-inline-block">
      {console.log('Set 2 active tab', activeKeys.set2)}
      {tabs.set2.map(tab => (
        <NavItem eventKey={tab.key} key={tab.key} title={tab.title}>
          {tab.title}
        </NavItem>
      ))}
    </Nav>
    )}
  </div> */


/*
<Tab.Container activeKey={activeKey}>

<BTabs defaultActiveKey={activeKey} onSelect={onSelect} id="component-tabs">
    {tabs.map((title, index) => (
      <Tab eventKey={index + 1} key={title} title={title} />
    ))}
  </BTabs>


  <BTabs defaultActiveKey={[activeKey, 2]} onSelect={key => onSelect(key)} id="component-tabs">
    {tabs.map((title, index) => (
      <Tab key={index} eventKey={index + 1} title={title}>
        {console.log('tabs', index + 1, title)}
      </Tab>
    ))}
    <div className="pull-right">
      <Tab title="poiukjlj" />
    </div>
    <Tab title="Ciaoa" />
    </BTabs>

  */
