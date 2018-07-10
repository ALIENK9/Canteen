import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import List from '../../components/List';
import TextBox from '../../components/ListItems/TextBox';
import DishItem from '../../components/dishes/DishItem';
import {
  getDishes, deleteDish, clearMessages,
} from '../../redux/actions/dishes.actions';
import Alert from '../../components/Alert';
import Toolbar from './Toolbar';
import AddModal from './AddModal';
import { getVisibleDishes, mapTypeToString } from '../utils';

class DishesList extends Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  render() {
    const {
      dishes, onDelete, error, success, closeAlert,
    } = this.props;
    return (
      <div>
        <AddModal />
        <Toolbar />
        { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
        { success && <Alert type="success" message={success} onDismiss={closeAlert} /> }
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
      </div>
    );
  }
}

DishesList.propTypes = {
  dishes: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired,
  closeAlert: PropTypes.func.isRequired,
};

DishesList.defaultProps = {
  dishes: [
    {
      name: 'Default',
      type: 'Default',
      description: 'Pasta con il sugo di pomodoro e basilico',
    },
  ],
};

const mapStateToProps = state => ({
  dishes: getVisibleDishes(state.dishes.list, state.dishes.filter),
  error: state.dishes.error,
  success: state.dishes.success,
  loading: state.dishes.loading,
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getDishes()),
  onDelete: id => dispatch(deleteDish(id)),
  closeAlert: () => dispatch(clearMessages()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DishesList));
