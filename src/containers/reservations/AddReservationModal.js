import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Modal } from 'react-bootstrap';
import AddReservationForm from './AddReservationForm';
import { addModalHide } from '../../redux/actions/reservations/reservations.actions';
import { mapMomentToString } from '../utils';

const AddModal = ({
  onHide, show, day, moment,
}) => (
  <Modal
    onHide={onHide}
    show={show}
  >
    <Modal.Header>
      <Modal.Title>
        Aggiungi una prenotazione per il
        {' '}
        {day}
        {' '}
        a
        {' '}
        {mapMomentToString(moment)}
      </Modal.Title>
    </Modal.Header>
    {/* per gestire il submit e l'annulla AddResForm si occupa di
   usare Modal.Body e Modal.Footer */}
    <AddReservationForm />
  </Modal>
);

AddModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool,
  day: PropTypes.string.isRequired,
  moment: PropTypes.oneOf(['lunch', 'dinner']),
};

AddModal.defaultProps = {
  show: false,
  moment: 'lunch',
};


const mapDispatchToProps = dispatch => ({
  onHide: () => dispatch(addModalHide()),
});

const mapStateToProps = state => ({
  show: state.reservations.ui.addModalShow,
  moment: state.reservations.ui.moment,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
