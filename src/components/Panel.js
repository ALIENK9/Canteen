import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';

const Panel = ({ title, children }) => (
  <div className="container">
    <PageHeader>
      {title}
    </PageHeader>
    {children}
  </div>
);

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};


export default Panel;
