import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({
  onClick, index, children, checked, param,
}) => {
  const styles = `flex-item w3-card w3-hover-shadow ${checked ? 'checked' : ''}`;
  return (
    <div className={styles} role="checkbox" aria-checked={checked} tabIndex={0} onClick={() => onClick(index, !checked, param)} onKeyPress={() => onClick(index, !checked, param)}>
      {children}
    </div>
  );
};

CheckBox.propTypes = {
  onClick: PropTypes.func,
  index: PropTypes.number.isRequired,
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
