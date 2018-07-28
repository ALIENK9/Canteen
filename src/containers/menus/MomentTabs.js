import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MOMENTS } from '../costants';
import { changeSelectedMoment } from '../../redux/actions/menus/menus.actions';
import Tabs from '../../components/Tabs';

const mapStateToProps = state => ({
  tabs: MOMENTS,
  activeKey: state.menus.ui.moment,
});

const mapDispatchToProps = dispatch => ({
  onSelect: moment => dispatch(changeSelectedMoment(moment)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tabs));
