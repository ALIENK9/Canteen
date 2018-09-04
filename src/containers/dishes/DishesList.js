import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import List from '../../components/List';
import TextBox from '../../components/ListItems/TextBox';
import DishItem from '../../components/dishes/DishItem';
import {
  getDishes, deleteDish,
} from '../../redux/actions/dishes/dishes.actions';
import { mapTypeToString } from '../utils';
import getSearchedVisibleDishes from '../selectors/dishfilter.selector';

class DishesList extends Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  render() {
    const {
      dishes, onDelete, loading,
    } = this.props;
    return (
      <React.Fragment>
        {(!dishes || !dishes.length) && (
        <span>
          Nessun piatto inserito
        </span>
        )}
        {(dishes && dishes.length > 0 && !loading) && (
          <List>
            {dishes.map(dish => (
              <TextBox
                key={dish.id}
                id={dish.id}
                onDelete={onDelete}
                deleteLabel={`Elimina il piatto ${dish.name}`}
                confirmation
              >
                <DishItem
                  name={dish.name}
                  type={mapTypeToString(dish.type)}
                  description={dish.description}
                />
              </TextBox>
            ))}
          </List>
        )}
      </React.Fragment>
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
  loading: PropTypes.bool,
};

DishesList.defaultProps = {
  dishes: [
    {
      name: 'Default',
      type: 0,
      description: 'Pasta con il sugo di pomodoro e basilico',
    },
  ],
  loading: true,
};

const mapStateToProps = state => ({
  dishes: getSearchedVisibleDishes(state.dishes),
  loading: state.dishes.ui.loading,
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getDishes()),
  onDelete: id => dispatch(deleteDish(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DishesList));
