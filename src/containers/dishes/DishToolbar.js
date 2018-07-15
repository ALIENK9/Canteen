import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { filterMeals, showAddForm } from '../../redux/actions/dishes/dishes.actions';
import Toolbar from '../../components/Toolbar';

const mapDispatchToProps = dispatch => ({
  buttons: [
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
  ],
  search: {
    presence: false,
  },
  add: {
    presence: true,
    func: () => dispatch(showAddForm()),
  },
});

export default withRouter(connect(null, mapDispatchToProps)(Toolbar));
