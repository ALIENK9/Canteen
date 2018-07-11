import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactBootstrapModal } from 'react-bootstrap';


const Modal = ({ show, children, onCancel }) => (
  <ReactBootstrapModal
    onHide={onCancel}
    show={show}
  >
    {children}
  </ReactBootstrapModal>
);

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onCancel: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  children: null,
};

export default Modal;
