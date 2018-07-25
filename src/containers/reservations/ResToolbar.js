import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Toolbar from '../../components/Toolbar';
import { addModalShow, filterMeals } from '../../redux/actions/reservations/reservations.actions';


const mapDispatchToProps = (dispatch, ownProps) => ({
  buttons: ownProps.view === 'meals' ? [
    {
      title: 'Tutti',
      func: () => dispatch(filterMeals('ALL')),
    },
    {
      title: 'Primi',
      func: () => dispatch(filterMeals('MAIN')),
    },
    {
      title: 'Secondi',
      func: () => dispatch(filterMeals('SECOND')),
    },
    {
      title: 'Contorni',
      func: () => dispatch(filterMeals('SIDE')),
    },
  ] : [],
  search: { presence: false, func: () => {} },
  add: {
    // REVIEW: trick un po' sporco per avere acesso alla prop 'view' e nascondere la barra
    presence: ownProps.view === 'users',
    func: () => dispatch(addModalShow()),
  },
});

export default withRouter(connect(null, mapDispatchToProps)(Toolbar));
