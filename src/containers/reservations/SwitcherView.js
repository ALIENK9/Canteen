/* import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeTab } from '../../redux/actions/reservations/reservations.actions';
import Tabs from '../../components/Tabs';

const mapStateToProps = state => ({
  activeKey: state.reservations.ui.view === 'meals' ? 1 : 2,
  view: state.reservations.ui.view,
  moment: state.reservations.ui.moment,
});

const mapDispatchToProps = dispatch => ({
  // onSelect: (key, moment) => dispatch(changeTab(key === 1 ? 'meals' : 'users'), moment),
});

// onst SwitcherView = withRouter(connect(mapStateToProps, mapDispatchToProps)(Tabs));
// export default SwitcherView;


/* const SwitcherView = ({ activeKey, onSelect }) => (
  <Tabs defaultActiveKey={activeKey} onSelect={onSelect} id="switch-view-tabs">
    <Tab eventKey={1} title="Vista pasti" />
    <Tab eventKey={2} title="Vista utenti" />
  </Tabs>
);

SwitcherView.propTypes = {
  activeKey: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SwitcherView; */
