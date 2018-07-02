import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({
  children,
}) => {
  const styles = 'flex-item card';
  return (
    <div className={styles} role="textbox">
      {children}
    </div>
  );
};

TextBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TextBox;
