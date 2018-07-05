import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';

const TextBox = ({
  children,
}) => {
  const styles = 'flex-item w3-card w3-hover-shadow';
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
