import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Toolbar from '../../components/Toolbar';
import { addModalShow } from '../../redux/actions/reservations/reservations.actions';


const mapDispatchToProps = (dispatch, ownProps) => ({
  buttons: [],
  search: { presence: false, func: () => {} },
  add: {
    // REVIEW: trick un po' sporco per avere acesso alla prop 'view' e nascondere la barra
    presence: ownProps.view === 'users',
    func: () => dispatch(addModalShow()),
  },
});

export default withRouter(connect(null, mapDispatchToProps)(Toolbar));
