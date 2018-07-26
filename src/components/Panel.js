import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ title, children }) => (
  <div>
    <h2>
      {title}
    </h2>
    {children}
  </div>
);

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};


export default Panel;
