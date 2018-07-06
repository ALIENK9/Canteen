import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactBootstrapModal, Button } from 'react-bootstrap';


const ModalFooter = ({ children, onCancel, styles }) => (
  <div className={styles}>
    <ReactBootstrapModal.Footer>
      <Button bsStyle="danger" onClick={onCancel}>
        Annulla
      </Button>
      <div className="custom-modal-footer-actions">
        {children}
      </div>
    </ReactBootstrapModal.Footer>
  </div>
);


ModalFooter.propTypes = {
  children: PropTypes.any.isRequired,
  onCancel: PropTypes.func.isRequired,
  styles: PropTypes.string,
};

ModalFooter.defaultProps = {
  styles: '',
};


export default ModalFooter;
