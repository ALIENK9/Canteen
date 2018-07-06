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
  children: PropTypes.any.isRequired,
  styles: PropTypes.string,
};

ModalBody.defaultProps = {
  styles: '',
};

export default ModalBody;
