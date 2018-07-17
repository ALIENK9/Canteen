import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import List from '../../components/List';
import CheckBox from '../../components/ListItems/CheckBox';
import MenuItem from '../../components/MenuItem';
import { getMenus, clearMessages, toggleMeal } from '../../redux/actions/menus/menus.actions';

// TODO: applicare lo schema con pagina principale che ho fatto anche per reservations e dishes
// (che vanno uniformati)
class MenuList extends Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  render() {
    const {
      meals, onItemClick, moment, loading,
    } = this.props;
    return (
      <List>
        {meals[moment].map((meal, index) => (
          <CheckBox
            key={meal.id}
            index={index}
            onClick={onItemClick}
            checked={meal.checked}
            param={moment}
          >
            <MenuItem name={meal.name} />
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
  // match: PropTypes.any.isRequired,
  moment: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  // error: PropTypes.string,
  // success: PropTypes.string,
  // closeMessage: PropTypes.func.isRequired,
};

MenuList.defaultProps = {
  meals: {
    lunch: [],
    dinner: [],
  },
  loading: true, // mostra lo spinner (bool)
  // error: '', // messaggio di errore
  // success: '', // conferma di successo oppure vuoto
};

const mapStateToProps = state => ({
  meals: state.menus.data.meals,
  loading: state.menus.ui.loading,
  moment: state.menus.ui.moment,
  error: state.menus.messages.error,
  success: state.menus.messages.success,
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getMenus()),
  onItemClick: (id, newVal, moment) => dispatch(toggleMeal(id, newVal, moment)),
  closeMessage: () => dispatch(clearMessages()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuList));
