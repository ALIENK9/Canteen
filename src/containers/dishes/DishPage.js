import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Toolbar from './Toolbar';
import AddModal from './AddModal';
import DishesList from './DishesList';
import Alert from '../../components/Alert';
import Panel from '../../components/Panel';
import { clearMessages } from '../../redux/actions/dishes.actions';

// REVIEW: uniformare con lo schema di Reservations nel quale solo ma
// Page è connessa e gli altri sono dumb components
const DishPage = ({ success, error, closeAlert }) => (
  <Panel title="Piatti disponibili">
    <AddModal />
    <Toolbar />
    { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
    { success && <Alert type="success" message={success} onDismiss={closeAlert} /> }
    <DishesList />
  </Panel>
);

DishPage.propTypes = {
  error: PropTypes.string,
  success: PropTypes.string,
  closeAlert: PropTypes.func.isRequired,
};

DishPage.defaultProps = {
  error: '',
  success: '',
};

const mapStateToProps = state => ({
  success: state.dishes.success,
  error: state.dishes.error,
});

const mapDispatchToProps = dispatch => ({
  closeAlert: () => dispatch(clearMessages()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DishPage));
