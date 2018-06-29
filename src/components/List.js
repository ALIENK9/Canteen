import React from 'react';
import PropTypes from 'prop-types';

const List = ({ children }) => (
  <div id="list" className="flex-container">
    {children}
  </div>
);

List.propTypes = {
  children: PropTypes.node,
};

List.defaultProps = {
  children: 'nessun contenuto',
};

export default List;
