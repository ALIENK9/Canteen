import React from 'react';
import { Modal as BModal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Modal = ({
  message, type, onOkClick, onCancelClick,
}) => {
  switch (type) {
    case 'success':
      return (
        <div className="static-modal">
          <BModal.Dialog>
            <BModal.Header>
              <BModal.Title>
                Operazione completata
              </BModal.Title>
            </BModal.Header>

            <BModal.Body>
              {message}
            </BModal.Body>

            <BModal.Footer>
              <Button bsStyle="primary" onClick={onOkClick}>
                OK
              </Button>
            </BModal.Footer>
          </BModal.Dialog>
        </div>
      );
    case 'confirm':
      return (
        <div className="static-modal">
          <BModal.Dialog>
            <BModal.Header>
              <BModal.Title>
                Vuoi continuare l&apos;operazione?
              </BModal.Title>
            </BModal.Header>

            <BModal.Body>
              {message}
            </BModal.Body>

            <BModal.Footer>
              <Button>
                Annulla
              </Button>
              <Button bsStyle="primary">
                Procedi
              </Button>
            </BModal.Footer>
          </BModal.Dialog>
        </div>
      );
    default:
      return null;
  }
};

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['confirm', 'success']).isRequired,
  onOkClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func,
};

Modal.defaultTypes = {
  onCancelClick: () => {},
};

export default Modal;
