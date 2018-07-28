import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MOMENTS } from '../costants';
import { changeSelectedMoment } from '../../redux/actions/reservations/reservations.actions';
import Tabs from '../../components/Tabs';

const mapStateToProps = state => ({
  tabs: MOMENTS,
  activeKey: state.reservations.ui.moment,
  classes: 'pull-right',
});

const mapDispatchToProps = dispatch => ({
  onSelect: moment => dispatch(changeSelectedMoment(moment)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tabs));
