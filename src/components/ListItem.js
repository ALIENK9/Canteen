import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/no-static-element-interactions jsx-a11y/no-noninteractive-tabindex
  jsx-a11y/no-static-element-interactions */
const ListItem = ({
  onClick, role, index, children,
}) => (
  <div className="flex-item card" role={role} tabIndex={0} onClick={() => onClick(index)} onKeyPress={() => onClick(index)}>
    {children}
  </div>
);

ListItem.propTypes = {
  onClick: PropTypes.func,
  role: PropTypes.oneOf(['button', 'checkbox']).isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

ListItem.defaultProps = {
  onClick: () => {},
};

export default ListItem;
