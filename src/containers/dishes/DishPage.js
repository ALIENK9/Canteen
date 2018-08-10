import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Panel } from 'react-bootstrap';
import DishToolbar from './DishToolbar';
import AddModal from './AddModal';
import DishesList from './DishesList';
import Alert from '../../components/Alert';
import MyPanel from '../../components/Panel';
import { clearMessages } from '../../redux/actions/dishes/dishes.actions';
import Loader from '../../components/Loader';
import { getDishes } from '../selectors/dishfilter.selector';


const DishPage = ({
  success, error, closeAlert, loading, dishes,
}) => (
  <MyPanel title="Piatti disponibili">
    <Panel>
      <Panel.Body>
        <DocumentTitle title="Gestione piatti | Servizio mensa" />
        <p>
          Qui sono listati tutti i piatti disponibili nel sistema. &Egrave; possibile
          aggiungerli e toglierli.
        </p>
        <DishToolbar list={dishes} />
        <AddModal />
        <Loader loading={loading} />
        { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
        { success && <Alert type="success" message={success} onDismiss={closeAlert} /> }
        <DishesList />
      </Panel.Body>
    </Panel>
  </MyPanel>
);

DishPage.propTypes = {
  dishes: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  closeAlert: PropTypes.func.isRequired,
};

DishPage.defaultProps = {
  dishes: [],
  loading: true,
  error: '',
  success: '',
};

const mapStateToProps = state => ({
  dishes: getDishes(state.dishes),
  loading: state.dishes.ui.loading,
  success: state.dishes.messages.success,
  error: state.dishes.messages.error,
});

const mapDispatchToProps = dispatch => ({
  closeAlert: () => dispatch(clearMessages()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DishPage));
