// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Toolbar from '../../components/Toolbar';
import { addModalShow, filterMeals, searchUser } from '../../redux/actions/reservations/reservations.actions';
import { FILTER_KEYS } from '../costants';

const mapStateToProps = state => ({
  defaultButtonKey: state.reservations.ui.filter,
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  buttons: ownProps.view === 'meals' ? [
    {
      title: 'Tutti',
      key: FILTER_KEYS.ALL,
      func: () => dispatch(filterMeals(FILTER_KEYS.ALL)),
    },
    {
      title: 'Primi',
      key: FILTER_KEYS.MAIN,
      func: () => dispatch(filterMeals(FILTER_KEYS.MAIN)),
    },
    {
      title: 'Secondi',
      key: FILTER_KEYS.SECOND,
      func: () => dispatch(filterMeals(FILTER_KEYS.SECOND)),
    },
    {
      title: 'Contorni',
      key: FILTER_KEYS.SIDE,
      func: () => dispatch(filterMeals(FILTER_KEYS.SIDE)),
    },
  ] : [],
  search: {
    presence: ownProps.view === 'users',
    func: id => dispatch(searchUser(id)),
    options: ownProps.view === 'users' ? ownProps.list.map(
      user => ({
        label: user.name,
        value: user.id,
      }),
    ) : [],
  },
  add: {
    // REVIEW: trick un po' sporco per avere acesso alla prop 'view' e nascondere la barra
    presence: ownProps.view === 'users',
    func: () => dispatch(addModalShow()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
