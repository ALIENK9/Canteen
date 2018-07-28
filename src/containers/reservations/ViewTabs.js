import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { VIEWS } from '../costants';
import { changeSelectedView } from '../../redux/actions/reservations/reservations.actions';
import Tabs from '../../components/Tabs';

const mapStateToProps = state => ({
  tabs: VIEWS,
  activeKey: state.reservations.ui.view,
});

const mapDispatchToProps = dispatch => ({
  onSelect: view => dispatch(changeSelectedView(view)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tabs));
