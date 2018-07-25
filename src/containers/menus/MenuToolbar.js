import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Toolbar from '../../components/Toolbar';
import { filterMeals } from '../../redux/actions/menus/menus.actions';

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
    presence: false,
  },
});

export default withRouter(connect(null, mapDispatchToProps)(Toolbar));
