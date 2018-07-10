import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getReservations, deleteReservation } from '../../redux/actions/reservations.actions';
import ResPage from '../../components/reservations/ResPage';

const mapStateToProps = state => ({
  list: state.reservations.list,
});

const mapDispatchToProps = dispatch => ({
  getData: (mode, moment) => dispatch(getReservations(mode, moment)),
  onDelete: (moment, id) => dispatch(deleteReservation(moment, id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResPage));
