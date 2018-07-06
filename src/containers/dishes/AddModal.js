import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Modal from '../../components/modals/Modal';
import ModalBody from '../../components/modals/ModalBody';
import ModalFooter from '../../components/modals/ModalFooter';
import ModalHeader from '../../components/modals/ModalHeader';
import { hideAddForm } from '../../redux/actions/dishes.actions';
import DishForm from './DishForm';

const AddModal = ({ close, show }) => (
  <Modal
    onCancel={close}
    show={show}
  >
    <ModalHeader title="Aggiungi un piatto" />
    <ModalBody>
      <DishForm />
    </ModalBody>
    <ModalFooter onCancel={close} />
  </Modal>
);

AddModal.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

AddModal.defaultProps = {
  show: false,
};


const mapDispatchToProps = dispatch => ({
  close: () => dispatch(hideAddForm()),
});

const mapStateToProps = state => ({
  show: state.dishes.add.show,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddModal));
