import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ title, children }) => (
  <div>
    <h3>
      {title}
    </h3>
    {children}
  </div>
);

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};


export default Panel;
