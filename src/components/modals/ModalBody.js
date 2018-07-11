import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactBootstrapModal } from 'react-bootstrap';


const ModalBody = ({ children, styles }) => (
  <div className={styles}>
    <ReactBootstrapModal.Body>
      {children}
    </ReactBootstrapModal.Body>
  </div>
);


ModalBody.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.string,
};

ModalBody.defaultProps = {
  children: null,
  styles: '',
};

export default ModalBody;
