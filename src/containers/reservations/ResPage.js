import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Panel } from 'react-bootstrap';
import MyPanel from '../../components/Panel';
import ReservationsList from './ReservationsList';
import UserList from './UserList';
import Alert from '../../components/Alert';
import { clearMessages } from '../../redux/actions/reservations/reservations.actions';
import AddReservationModal from './AddReservationModal';
import ResToolbar from './ResToolbar';
import Loader from '../../components/Loader/Loader';
import ViewTabs from './ViewTabs';
import MomentTabs from './MomentTabs';
import { mapMomentToString } from '../utils';
// import Tabs from '../../components/Tabs';
// import { VIEWS, MOMENTS } from '../costants';


const ResPage = ({
  match, error, closeAlert, view, loading, history, moment,
}) => {
  const { day } = match.params;
  return (
    <MyPanel title={`Prenotazioni del giorno ${day}`} history={history}>
      <Panel bsStyle="primary">
        <Panel.Heading>
          <DocumentTitle title="Prenotazione" />
          <ViewTabs />
          <MomentTabs />
        </Panel.Heading>
        <Panel.Body>
          <p>
            Queste sono le prenotazioni effettuate per la giornata
            {' '}
            {day}
            {' '}
            a
            {' '}
            {mapMomentToString(moment)}
          </p>
          <ResToolbar view={view} />
          <Loader loading={loading} />
          <AddReservationModal day={day} />
          {console.log('Res Page view ', view)}
          { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
          { view === 'users' && <UserList day={day} /> }
          { view === 'meals' && <ReservationsList day={day} /> }
        </Panel.Body>
      </Panel>
    </MyPanel>
  );
};


/* class ResPage extends Component {
  constructor(props) {
    super(props);
    this.handleMomentChange = this.handleMomentChange.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  componentDidMount() { // due tab sono inizialmente cliccati
    console.log('I mounted respage');
    this.handleMomentChange('lunch');
    this.handleViewChange('meals');
  }

  componentDidUpdate(prevProps) {
    console.log('I updated respage');
    const {
      view: ov, moment: om, error: oe, loading: ol,
    } = prevProps;
    const {
      view, moment, error, loading,
    } = this.props;
    if (view !== ov || moment !== om || error !== oe || loading !== ol) {
      console.log('I detected change', om, moment);
      // if (view !== ov) this.handleViewChange(view);
      // if (moment !== om) this.handleMomentChange(moment);
    }
  }

  // NOTE: Funzioni per controllare i Tabs. Lasciarli componenti controllati
  handleViewChange(key) {
    const { onViewChange } = this.props;
    onViewChange(key);
  }

  handleMomentChange(key) {
    const { onMomentChange } = this.props;
    console.log('momentChange', key);
    onMomentChange(key);
  }


  render() {
    const {
      match, error, closeAlert, view, moment, loading,
    } = this.props;
    const { day } = match.params;

    return (
      <MyPanel title={`Prenotazioni del giorno ${day}`}>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <DocumentTitle title="Prenotazione" />
            <Tabs tabs={VIEWS} activeKey={view} onSelect={this.handleViewChange} />
            <Tabs tabs={MOMENTS} activeKey={moment} onSelect={this.handleMomentChange}
             classes="pull-right" />
          </Panel.Heading>
          <Panel.Body>
            <ResToolbar view={view} />
            <Loader loading={loading} />
            <AddReservationModal />
            {console.log('Res Page view ', view)}
            { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
            { view === 'users' && <UserList /> }
            { view === 'meals' && <ReservationsList /> }
          </Panel.Body>
        </Panel>
      </MyPanel>
    );
  }
} */


ResPage.propTypes = {
  match: PropTypes.object.isRequired,
  closeAlert: PropTypes.func.isRequired,
  error: PropTypes.string,
  view: PropTypes.oneOf(['users', 'meals']),
  history: PropTypes.object,
  moment: PropTypes.oneOf(['lunch', 'dinner']),
  // onViewChange: PropTypes.func.isRequired,
  // onMomentChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

ResPage.defaultProps = {
  error: '',
  view: 'meals',
  history: null,
  moment: 'lunch',
  loading: true,
  // success: '',
};

const mapStateToProps = state => ({
  list: state.reservations.data.list,
  error: state.reservations.messages.error,
  view: state.reservations.ui.view,
  loading: state.reservations.ui.loading,
  moment: state.reservations.ui.moment,
  // success: state.reservations.success,
});

const mapDispatchToProps = dispatch => ({
  closeAlert: () => dispatch(clearMessages()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResPage));
