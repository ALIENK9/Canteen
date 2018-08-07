import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '../../components/List';
import CheckBox from '../../components/ListItems/CheckBox';
import MenuItem from '../../components/MenuItem';
import {
  clearMessages, toggleMeal, getAllData,
} from '../../redux/actions/menus/menus.actions';
import { mapTypeToString } from '../utils';
import getVisibleMenu, { getMoment } from '../selectors/menufilter.selector';

// TODO: applicare lo schema con pagina principale che ho fatto anche per reservations e dishes
// (che vanno uniformati)
class MenuList extends Component {
  componentDidMount() {
    const {
      day, getData,
    } = this.props;
    // getTodayMenu(day);
    getData(day);
    // getDishes();
  }

  render() {
    const {
      onItemClick, moment, entries,
    } = this.props;
    console.log('Entrues in list', entries, entries[moment], Array.isArray(entries[moment]));
    /* const menuIds = meals[moment].map(el => el.id);
    const entries = dishes.map(dish => ({
      ...dish,
      checked: menuIds.includes(dish.id),
    })); */
    return (
      <React.Fragment>
        {(!entries || !entries.length) && (
        <span>
          Nessun menù per questa giornata
        </span>
        )}
        {entries && entries.length > 0 && (
          <List>
            {entries.map(meal => (
              <CheckBox
                key={meal.id}
                id={meal.id}
                onClick={onItemClick}
                checked={meal.checked}
                param={moment}
              >
                <MenuItem name={meal.name} type={mapTypeToString(meal.type)} />
              </CheckBox>
            ))}
          </List>
        )}
      </React.Fragment>
    );
  }
}

MenuList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    checked: PropTypes.bool,
    name: PropTypes.string,
  })),
  onItemClick: PropTypes.func.isRequired,
  // getTodayMenu: PropTypes.func.isRequired,
  // getDishes: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  day: PropTypes.string.isRequired,
  // match: PropTypes.any.isRequired,
  moment: PropTypes.oneOf(['lunch', 'dinner']),
  // error: PropTypes.string,
  // success: PropTypes.string,
  // closeMessage: PropTypes.func.isRequired,
};

MenuList.defaultProps = {
  // dishes: [],
  /* meals: {
    lunch: [],
    dinner: [],
  }, */
  entries: {
    lunch: [],
    dinner: [],
  },
  moment: 'lunch',
  // error: '', // messaggio di errore
  // success: '', // conferma di successo oppure vuoto
};

const mapStateToProps = state => ({
  /* meals: {
      lunch: getVisibleMenu(state.menus), // (lunch, filter),
      dinner: getVisibleMenu(state.menus), // (dinner, filter),
    }, */
  entries: getVisibleMenu(state.menus), // state.menus.data.entries,
  loading: state.menus.ui.loading,
  moment: getMoment(state.menus),
  error: state.menus.messages.error,
  success: state.menus.messages.success,
});


const mapDispatchToProps = dispatch => ({
  getData: day => dispatch(getAllData(day)),
  onItemClick: (id, newVal, moment) => dispatch(toggleMeal(id, newVal, moment)),
  closeMessage: () => dispatch(clearMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
