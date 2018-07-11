import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import List from '../../components/List';
import TextBox from '../../components/ListItems/TextBox';
import DishItem from '../../components/dishes/DishItem';
import {
  getDishes, deleteDish,
} from '../../redux/actions/dishes.actions';
import { getVisibleDishes, mapTypeToString } from '../utils';

class DishesList extends Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  render() {
    const {
      dishes, onDelete,
    } = this.props;
    return (
      <List>
        {dishes.map(dish => (
          <TextBox key={dish.id} id={dish.id} onDelete={onDelete}>
            {console.log('sdjkdsds', dish.id)}
            <DishItem
                // id={dish.id}
              name={dish.name}
              type={mapTypeToString(dish.type)}
              description={dish.description}
            />
          </TextBox>
        ))}
      </List>
    );
  }
}

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.number,
    description: PropTypes.string,
    id: PropTypes.number,
  })),
  onDelete: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

DishesList.defaultProps = {
  dishes: [
    {
      name: 'Default',
      type: 0,
      description: 'Pasta con il sugo di pomodoro e basilico',
    },
  ],
};

const mapStateToProps = state => ({
  dishes: getVisibleDishes(state.dishes.list, state.dishes.filter),
  loading: state.dishes.loading,
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getDishes()),
  onDelete: id => dispatch(deleteDish(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DishesList));
