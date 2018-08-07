import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import MyPanel from '../../components/Panel';
import Alert from '../../components/Alert';
import MenuList from './MenuList';
import { putMenus, changeSelectedMoment, clearMessages } from '../../redux/actions/menus/menus.actions';
import Loader from '../../components/Loader';
import MenuToolbar from './MenuToolbar';
import MomentTabs from './MomentTabs';
import { getMenu, getMoment } from '../selectors/menufilter.selector';

class MenuPage extends Component {
  constructor(props) {
    super(props);
    // this.handleMomentChange = this.handleMomentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* handleMomentChange(key) {
    const { onMomentChange } = this.props;
    console.log(key);
    onMomentChange(key);
  } */

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
    console.log('before submit', processedData);
    onSubmit(processedData);
  }

  render() {
    const {
      match, error, success, closeAlert, loading, history,
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
          <Panel.Footer className="center">
            <Button bsStyle="primary" type="submit" onClick={e => this.handleSubmit(e)}>
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
  // moment: PropTypes.oneOf(['lunch', 'dinner']),
  error: PropTypes.string,
  success: PropTypes.string,
  closeAlert: PropTypes.func,
  // onMomentChange: PropTypes.func,
  onSubmit: PropTypes.func,
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
  // moment: 'lunch',
  history: null,
  loading: true,
  success: '',
  error: '',
  closeAlert: () => {},
  // onMomentChange: () => {},
  onSubmit: () => {},
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
  onMomentChange: moment => dispatch(changeSelectedMoment(moment)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuPage));
