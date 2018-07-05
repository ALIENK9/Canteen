import React from 'react';
import { Alert as BAlert, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Alert = ({ type, message, onDismiss }) => {
  let title;
  switch (type) {
    case 'danger':
      title = 'Oh crap! Qualcosa di brutto è successo';
      break;
    case 'success':
      title = 'Operazione completata correttamente';
      break;
    default:
      title = 'No title';
      break;
  }

  return (
    <BAlert bsStyle={type} onDismiss={onDismiss}>
      <h4>
        {title}
      </h4>
      <p>
        {message}
      </p>
      <p>
        <Button bsStyle={type} onClick={onDismiss}>
          Ok
        </Button>
      </p>
    </BAlert>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['danger', 'success']).isRequired,
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Alert;
