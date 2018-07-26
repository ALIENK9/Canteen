import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import DishToolbar from './DishToolbar';
import AddModal from './AddModal';
import DishesList from './DishesList';
import Alert from '../../components/Alert';
import Panel from '../../components/Panel';
import { clearMessages } from '../../redux/actions/dishes/dishes.actions';
import Loader from '../../components/Loader/Loader';

// REVIEW: uniformare con lo schema di Reservations nel quale solo ma
// Page è connessa e gli altri sono dumb components
const DishPage = ({
  success, error, closeAlert, loading,
}) => (
  <Panel title="Piatti disponibili">
    <DocumentTitle title="Gestione piatti" />
    <DishToolbar />
    <AddModal />
    <Loader loading={loading} />
    { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
    { success && <Alert type="success" message={success} onDismiss={closeAlert} /> }
    <DishesList />
  </Panel>
);

DishPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  closeAlert: PropTypes.func.isRequired,
};

DishPage.defaultProps = {
  loading: true,
  error: '',
  success: '',
};

const mapStateToProps = state => ({
  loading: state.dishes.ui.loading,
  success: state.dishes.messages.success,
  error: state.dishes.messages.error,
});

const mapDispatchToProps = dispatch => ({
  closeAlert: () => dispatch(clearMessages()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DishPage));
