import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import List from '../../components/List';
import CheckBox from '../../components/ListItems/CheckBox';
import MenuItem from '../../components/MenuItem';
import { getMenus, clearMessages, toggleMeal } from '../../redux/actions/menus/menus.actions';
import { mapTypeToString, getVisibleDishes } from '../utils';

// TODO: applicare lo schema con pagina principale che ho fatto anche per reservations e dishes
// (che vanno uniformati)
class MenuList extends Component {
  componentDidMount() {
    const { getData, day } = this.props;
    getData(day);
  }

  render() {
    const {
      meals, onItemClick, moment,
    } = this.props;
    return (
      <List>
        {meals[moment].map(meal => (
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
    );
  }
}

MenuList.propTypes = {
  meals: PropTypes.shape({
    lunch: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      checked: PropTypes.bool,
      name: PropTypes.string,
    })),
    dinner: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      checked: PropTypes.bool,
      name: PropTypes.string,
    })),
  }),
  onItemClick: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  day: PropTypes.string.isRequired,
  // match: PropTypes.any.isRequired,
  moment: PropTypes.string.isRequired,
  // error: PropTypes.string,
  // success: PropTypes.string,
  // closeMessage: PropTypes.func.isRequired,
};

MenuList.defaultProps = {
  meals: {
    lunch: [],
    dinner: [],
  },
  // error: '', // messaggio di errore
  // success: '', // conferma di successo oppure vuoto
};

const mapStateToProps = (state) => {
  const { lunch, dinner } = state.menus.data.meals;
  const { filter } = state.menus.ui;
  return {
    meals: {
      lunch: getVisibleDishes(lunch, filter),
      dinner: getVisibleDishes(dinner, filter),
    },
    loading: state.menus.ui.loading,
    moment: state.menus.ui.moment,
    error: state.menus.messages.error,
    success: state.menus.messages.success,
  };
};

const mapDispatchToProps = dispatch => ({
  getData: day => dispatch(getMenus(day)),
  onItemClick: (id, newVal, moment) => dispatch(toggleMeal(id, newVal, moment)),
  closeMessage: () => dispatch(clearMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
