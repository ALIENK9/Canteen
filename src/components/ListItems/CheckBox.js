import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({
  onClick, id, children, checked, param,
}) => {
  const styles = `flex-item card ${checked ? 'checked' : ''}`;
  return (
    <div
      className={styles}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={() => onClick(id, !checked, param)}
      onKeyPress={() => onClick(id, !checked, param)}
    >
      {children}
    </div>
  );
};

CheckBox.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  param: PropTypes.string,
};

CheckBox.defaultProps = {
  onClick: () => {},
  checked: false,
  param: null, // parametro opzionale che può servire per l'onClick
};

export default CheckBox;
