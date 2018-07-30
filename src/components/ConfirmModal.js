import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';


const ConfirmModal = ({
  message, confirm, reject, show,
}) => (
  <Modal show={show} onHide={reject}>
    <Modal.Header>
      <Modal.Title>
        {message}
      </Modal.Title>
    </Modal.Header>
    <Modal.Footer>
      <Button bsStyle="success" className="pull-left" onClick={confirm}>
        Conferma
      </Button>
      <Button bsStyle="danger" onClick={reject}>
        Annulla
      </Button>
    </Modal.Footer>
  </Modal>
);

ConfirmModal.propTypes = {
  message: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default ConfirmModal;
