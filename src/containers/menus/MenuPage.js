import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import MyPanel from '../../components/Panel';
import Alert from '../../components/Alert';
import MenuList from './MenuList';
import {
  deleteMenu, putMenus, changeSelectedMoment, clearMessages,
} from '../../redux/actions/menus/menus.actions';
import Loader from '../../components/Loader';
import MenuToolbar from './MenuToolbar';
import MomentTabs from './MomentTabs';
import { getMenu, getMoment } from '../selectors/menufilter.selector';

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { allEntries, onDelete } = this.props;
    const { id } = allEntries;
    if (id) onDelete(id);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSubmit, allEntries, match } = this.props;
    const { dinner, lunch, id } = allEntries;
    const { day } = match.params;
    const processedData = {
      id,
      date: day,
      lunch: lunch.filter(meal => meal.checked === true),
      dinner: dinner.filter(meal => meal.checked === true),
    };
    if (processedData.lunch.length || processedData.dinner.length) onSubmit(processedData);
  }

  render() {
    const {
      match, error, success, closeAlert, loading, history, allEntries,
    } = this.props;
    const { day } = match.params;
    return (
      <MyPanel title={`Gestione menù del giorno ${day}`} history={history}>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <DocumentTitle title={`Menù ${day} | Servizio mensa`} />
            <MomentTabs />
          </Panel.Heading>
          <Panel.Body>
            <p>
              Scegli il menù disponibile in questa giornata
            </p>
            { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
            { success && <Alert type="success" message={success} onDismiss={closeAlert} /> }
            <MenuToolbar />
            <Loader loading={loading} />
            <MenuList day={day} />

          </Panel.Body>
          <Panel.Footer>
            <Button // TODO: aggiungere un ConfirmModal
              className="pull-left"
              bsStyle="danger"
              onClick={() => this.handleDelete()}
              disabled={!allEntries.id}
              title={allEntries.id ? '' : 'Non è stato ancora salvato un menù'}
            >
              Elimina il menù
            </Button>
            <Button
              className="pull-right"
              bsStyle="success"
              type="submit"
              onClick={e => this.handleSubmit(e)}
            >
              Conferma e salva
            </Button>
          </Panel.Footer>
        </Panel>
      </MyPanel>
    );
  }
}

MenuPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  closeAlert: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  allEntries: PropTypes.shape({
    id: PropTypes.string,
    lunch: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      checked: PropTypes.bool,
      name: PropTypes.string,
    })),
    dinner: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      checked: PropTypes.bool,
      name: PropTypes.string,
    })),
  }),
};

MenuPage.defaultProps = {
  history: null,
  loading: true,
  success: '',
  error: '',
  closeAlert: () => {},
  onSubmit: () => {},
  onDelete: () => {},
  allEntries: {
    id: '',
    lunch: [],
    dinner: [],
  },
};

const mapStateToProps = state => ({
  loading: state.menus.ui.loading,
  allEntries: getMenu(state.menus),
  moment: getMoment(state.menus),
  error: state.menus.messages.error,
  success: state.menus.messages.success,
});

const mapDispatchToProps = dispatch => ({
  closeAlert: () => dispatch(clearMessages()),
  onSubmit: meals => dispatch(putMenus(meals)),
  onDelete: menuId => dispatch(deleteMenu(menuId)),
  onMomentChange: moment => dispatch(changeSelectedMoment(moment)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuPage));
