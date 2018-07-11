import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactBootstrapModal } from 'react-bootstrap';


const ModalHeader = ({ children, title, styles }) => (
  <div className={styles}>
    <ReactBootstrapModal.Header>
      <ReactBootstrapModal.Title>
        {title}
      </ReactBootstrapModal.Title>
      {children}
    </ReactBootstrapModal.Header>
  </div>
);


ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  styles: PropTypes.string,
};

ModalHeader.defaultProps = {
  children: null,
  styles: '',
};


export default ModalHeader;
