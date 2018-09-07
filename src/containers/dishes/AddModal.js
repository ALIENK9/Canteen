import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { hideAddForm } from '../../redux/actions/dishes/dishes.actions';
import DishForm from './DishForm';

const AddModal = ({ close, show }) => (
  <Modal
    onHide={close}
    show={show}
  >
    <Modal.Header>
      <Modal.Title componentClass="p" className="modal-head">
        Aggiungi un nuovo piatto
      </Modal.Title>
    </Modal.Header>
    {/* Per gestire i due pulsanti nel footer DishForm si occupa di entrambi */}
    <DishForm />
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
  show: state.dishes.ui.addModalShow,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddModal));
