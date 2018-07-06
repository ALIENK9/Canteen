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
import {
  getDishes, deleteDish, clearMessages, hideAddForm, showAddForm, hideErrorForm,
} from '../redux/actions/dishes.actions';
import Alert from '../components/Alert';
import Modal from '../components/modals/Modal';
import DishForm from './DishForm';
import ModalBody from '../components/modals/ModalBody';
import ModalHeader from '../components/modals/ModalHeader';
import ModalFooter from '../components/modals/ModalFooter';

class DishesList extends Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  /* handleAdd(event) {
    event.preventDefault();
    const { openAddModal } = this.props;
    openAddModal();
  } */

  render() {
    const {
      dishes, onDelete, error, success, closeAlert, show, closeAddModal, openAddModal,
      addError, closeAlertForm,
    } = this.props;
    return (
      <div>
        {console.log('doing fancy things', addError)}
        <Modal
          onCancel={closeAddModal}
          show={show}
        >
          <ModalHeader title="Aggiungi un piatto" />
          { addError && <Alert type="danger" message={addError} onDismiss={closeAlertForm} /> }
          <ModalBody>
            <DishForm />
          </ModalBody>
          <ModalFooter onCancel={closeAddModal} />
        </Modal>
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
            <Button onClick={openAddModal} className="pull-right" bsStyle="primary">
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
  show: PropTypes.bool,
  closeAddModal: PropTypes.func.isRequired,
  openAddModal: PropTypes.func.isRequired,
  addError: PropTypes.string,
  closeAlertForm: PropTypes.func,
};

DishesList.defaultProps = {
  dishes: [
    {
      name: 'Pasta default',
      type: 'Primo',
      description: 'Pasta con il sugo di pomodoro e basilico',
    },
  ],
  show: false,
  addError: null,
  closeAlertForm: () => {},
};

const mapStateToProps = state => ({
  dishes: state.dishes.list,
  error: state.dishes.error,
  success: state.dishes.success,
  loading: state.dishes.loading,
  show: state.dishes.add.show,
  addError: state.dishes.add.error,
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getDishes()),
  onDelete: id => dispatch(deleteDish(id)),
  closeAlert: () => dispatch(clearMessages()), // todo: collegare agli alert
  closeAddModal: () => dispatch(hideAddForm()),
  openAddModal: () => dispatch(showAddForm()),
  closeAlertForm: () => dispatch(hideErrorForm()),
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
