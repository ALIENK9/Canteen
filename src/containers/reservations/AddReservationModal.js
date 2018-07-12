import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Modal from '../../components/modals/Modal';
import ModalBody from '../../components/modals/ModalBody';
import ModalFooter from '../../components/modals/ModalFooter';
import ModalHeader from '../../components/modals/ModalHeader';
import AddReservationForm from './AddReservationForm';
import { addModalHide } from '../../redux/actions/reservations/reservations.actions';

const AddModal = ({ onHide, show }) => (
  <Modal
    onCancel={onHide}
    show={show}
  >
    <ModalHeader title="Aggiungi un piatto" />
    <ModalBody>
      {show && <AddReservationForm />}
    </ModalBody>
    <ModalFooter onCancel={onHide} />
  </Modal>
);

AddModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

AddModal.defaultProps = {
  show: false,
};


const mapDispatchToProps = dispatch => ({
  onHide: () => dispatch(addModalHide()),
});

const mapStateToProps = state => ({
  show: state.reservations.ui.addModalShow,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddModal));
