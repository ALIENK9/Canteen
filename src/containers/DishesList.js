import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Button, Glyphicon, ToggleButton, ToggleButtonGroup, ButtonToolbar,
} from 'react-bootstrap';
import List from '../components/List';
import TextBox from '../components/ListItems/TextBox';
import DishItem from '../components/DishItem';
import { getDishes, deleteDish, clearMessages } from '../redux/actions/dishes.actions';
import Alert from '../components/Alert';

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
        <div id="listbar">
          <ButtonToolbar className="button-toolbar">
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
              <ToggleButton value={1}>
                Primi
              </ToggleButton>
              <ToggleButton value={2}>
                Secondi
              </ToggleButton>
              <ToggleButton value={3}>
                Contorni
              </ToggleButton>
            </ToggleButtonGroup>
            <Button className="pull-right" bsStyle="primary">
              <Glyphicon glyph="glyphicon glyphicon-plus" />
            </Button>
          </ButtonToolbar>
        </div>
        { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
        { success && <Alert type="success" message={success} onDismiss={closeAlert} /> }
        <List>
          {dishes.map(dish => (
            <TextBox key={dish.id} id={dish.id}>
              <DishItem
                id={dish.id}
                name={dish.name}
                type={dish.type}
                description={dish.description}
                onDelete={onDelete}
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
      name: 'Pasta default',
      type: 'Primo',
      description: 'Pasta con il sugo di pomodoro e basilico',
    },
  ],
};

const mapStateToProps = state => ({
  dishes: state.dishes.list,
  error: state.dishes.error,
  success: state.dishes.success,
  loading: state.dishes.loading,
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getDishes()),
  onDelete: id => dispatch(deleteDish(id)),
  closeAlert: () => dispatch(clearMessages()), // todo: collegare agli alert
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DishesList));

/* past

return (
      <div>
        <div id="listbar">
          <h2>
            Aggiunta di pasti
          </h2>
        </div>
        <List>
          {meals.map((meal, index) => (
            <TextBox key={meal} index={index} onClick={onItemClick} checked={meal.checked}>
              <MenuItem name={meal.name} />
            </TextBox>
          ))}
        </List>
        <div>
          <button type="submit" onClick={onSubmit}>
            Conferma
          </button>
        </div>
      </div>
    );
    */
