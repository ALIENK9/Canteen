import React from 'react';
import PropTypes from 'prop-types';

const CollapseBox = ({
  onClick, index, children,
}) => {
  const styles = 'flex-item card';
  return (
    <div className={styles} role="button" tabIndex={0} onClick={() => onClick(index)} onKeyPress={() => onClick(index)}>
      {children}
    </div>
  );
};

CollapseBox.propTypes = {
  onClick: PropTypes.func,
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

CollapseBox.defaultProps = {
  onClick: () => {},
};

export default CollapseBox;
