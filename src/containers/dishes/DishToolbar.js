import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { filterMeals, showAddForm, searchDish } from '../../redux/actions/dishes/dishes.actions';
import Toolbar from '../../components/Toolbar';
import { FILTER_KEYS } from '../costants';

const mapStateToProps = state => ({
  defaultButtonKey: state.dishes.ui.filter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  buttons: [
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
    {
      title: 'Dessert',
      key: FILTER_KEYS.DESSERT,
      func: () => dispatch(filterMeals(FILTER_KEYS.DESSERT)),
    },
  ],
  search: {
    presence: true,
    func: selectObj => dispatch(searchDish(selectObj || { value: '' })),
    options: (Array.isArray(ownProps.list)) ? ownProps.list.map(
      dish => ({ label: dish.name, value: dish.id }),
    ) : [],
  },
  add: {
    presence: true,
    func: () => dispatch(showAddForm()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
