import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchData, toggleMeal } from '../redux/menus/actions';
import List from '../components/List';
import CheckBox from '../components/ListItems/CheckBox';
import MenuItem from '../components/MenuItem';


class MenuList extends Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  render() {
    const { meals, onItemClick, match } = this.props;
    const { day } = match.params;
    return (
      <div>
        <div id="listbar">
          <h2>
            Giornata
            {' '}
            {day}
          </h2>
        </div>
        <List>
          {meals.map((meal, index) => (
            <CheckBox key={meal} index={index} onClick={onItemClick} checked={meal.checked}>
              <MenuItem name={meal.name} />
            </CheckBox>
          ))}
        </List>
      </div>
    );
  }
}

MenuList.propTypes = {
  meals: PropTypes.array,
  onItemClick: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  match: PropTypes.any.isRequired,
};

MenuList.defaultProps = {
  meals: [],
};

const mapStateToProps = state => ({
  meals: state.meals,
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(fetchData()),
  onItemClick: (id, newVal) => dispatch(toggleMeal(id, newVal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
