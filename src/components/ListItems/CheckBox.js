import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({
  onClick, index, children, checked,
}) => {
  const styles = `flex-item card ${checked ? 'checked' : ''}`;
  return (
    <div className={styles} role="checkbox" aria-checked={checked} tabIndex={0} onClick={() => onClick(index, !checked)} onKeyPress={() => onClick(index, !checked)}>
      {children}
    </div>
  );
};

CheckBox.propTypes = {
  onClick: PropTypes.func,
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool.isRequired,
};

CheckBox.defaultProps = {
  onClick: () => {},
};

export default CheckBox;
