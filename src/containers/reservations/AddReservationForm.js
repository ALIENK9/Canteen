import React, { Component } from 'react';
import {
  FormGroup, ControlLabel, FormControl, HelpBlock, Button, Radio, Checkbox, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Alert from '../../components/Alert';
import { mapTypeToString } from '../utils';
import {
  getDayMenu, postReservation, hideErrorForm, getUserList, addModalHide,
} from '../../redux/actions/reservations/reservations.actions';
import validateReservation from '../../validation/addReservation.validator';

class AddReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { label: '', value: null },
      maindish: '1',
      seconddish: '5',
      sidedish: '7',
      lunchbag: false,
      hour: '',
      validationErrors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }


  componentDidMount() {
    const {
      getUsers, getMeals, match, moment,
    } = this.props;
    const { day } = match.params;
    const defaultTime = moment === 'lunch' ? '12:30' : '19:45';
    this.setState({ hour: defaultTime });
    getMeals(day, moment);
    getUsers();
  }

  isValid() {
    const { moment } = this.props;
    const { errors, isValid } = validateReservation(this.state, moment);
    if (!isValid) this.setState({ validationErrors: errors });
    else this.setState({ validationErrors: {} });
    return isValid;
  }

  /**
   * Handle user interactions with input changing local state whenever user types or select
   * @param {Event} event
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  /**
   * Handle change of selection for react-select component
   * @param {Object} selectedOption The selection object contining 'label' and 'value'
   */
  handleSelectChange(selectedOption) {
    this.setState({ user: selectedOption });
  }


  handleCheckboxChange(e) {
    const { checked } = e.target;
    console.log(checked);
    this.setState({ lunchbag: checked, hour: '' });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.isValid()) return;

    const {
      onSubmit, moment, view, dayMeals, match,
    } = this.props;
    const {
      user, maindish, seconddish, sidedish, hour, lunchbag,
    } = this.state;

    const { day } = match.params;

    // campi obbbligatori
    if (!user.value || !maindish || !seconddish || !sidedish) return;

    // TALE COSA ESISTE PER L'UNICO SCOPO DI OTTENERE IL NOME DELLA PIETANZA DA MOSTRARE
    const mealsid = [ // id come numeri dei patti scelti
      Number.parseInt(maindish, 10),
      Number.parseInt(seconddish, 10),
      Number.parseInt(sidedish, 10),
    ];
    const onlyIds = dayMeals.map(meal => meal.id);
    const mealsIndex = [ // indici degli elementi scelti nell'array dayMeals
      onlyIds.indexOf(mealsid[0]),
      onlyIds.indexOf(mealsid[1]),
      onlyIds.indexOf(mealsid[2]),
    ];
    // -----------------------fine tale cosa----------------------------------------------
    const userSubmit = { id: user.value, name: user.label };

    // NOTE: user: Object con { name: "Nome Cognome", id: (id) }
    const dato = !lunchbag ? {
      user: userSubmit,
      meals: [
        {
          id: mealsid[0], // primo
          name: dayMeals[mealsIndex[0]].name,
          type: 1,
        },
        {
          id: mealsid[1], // secondo
          name: dayMeals[mealsIndex[1]].name,
          type: 2,
        },
        {
          id: mealsid[2], // contorno
          name: dayMeals[mealsIndex[2]].name,
          type: 3,
        },
      ],
      date: day,
      moment,
      hour: hour.trim(),
    } : {
      user: userSubmit,
      meals: [
        {
          id: 'panino_id',
          name: 'Panino al sacco',
          type: 9,
        },
      ],
      date: day,
      moment,
      hour: null,
    };
    console.log('Dato pronto per submit: ', dato);
    onSubmit(dato, moment, view);
  }

  render() {
    const { state } = this;
    const {
      hour, lunchbag, validationErrors,
    } = state;
    const {
      error, closeAlert, dayMeals, users, onHide, moment,
    } = this.props;
    const typesArray = [
      { type: 1, inputname: 'maindish' },
      { type: 2, inputname: 'seconddish' },
      { type: 3, inputname: 'sidedish' },
    ];
    const unsernameInput = 'username';

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <form onSubmit={this.handleSubmit}>
        <Modal.Body>
          { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }

          <FormGroup>
            <label htmlFor={unsernameInput}>
              Nome utente
              {' '}
              <abbr title="campo richiesto">
                *
              </abbr>
            </label>
            <Select
              options={users}
              noOptionsMessage={() => 'Nessun utente con questo nome'}
              inputId={unsernameInput}
              onChange={opt => this.handleSelectChange(opt)}
              isClearable
              placeholder="Mario Bianchi"
            />

            {validationErrors.user && (
            <HelpBlock bsClass="help-block-error">
              { validationErrors.user}
            </HelpBlock>
            )}
          </FormGroup>

          <p className="radio-label">
            Scegli il menù
            {' '}
            <abbr title="campo richiesto">
                *
            </abbr>
          </p>

          <FormGroup controlId="lunchbag">
            <Checkbox
              checked={state.lunchbag}
              title="Pranzo al sacco (panino)"
              onChange={e => this.handleCheckboxChange(e)}
            >
              Pranzo al sacco
            </Checkbox>
          </FormGroup>

          {typesArray.map(obj => (
            <FormGroup key={obj.type}>
              <p>
                Scegli il
                {' '}
                {mapTypeToString(obj.type).toLowerCase()}
              </p>
              { dayMeals.filter(meal => meal.type === obj.type).map(meal => (
                <Radio
                  key={meal.id}
                  id={meal.id}
                  name={obj.inputname}
                  checked={state[obj.inputname] === meal.id.toString()}
                  value={meal.id}
                  onChange={e => this.handleChange(e)}
                  disabled={!!lunchbag}
                  inline
                >
                  {meal.name}
                </Radio>
              )) }
            </FormGroup>
          ))}

          <FormGroup controlId="hour">
            <ControlLabel>
              Orario pasto
              {' '}
              {moment === 'lunch'
                ? '(11:00-14:00 a scatti di 15 minuti)' : '(19:00-21:30 a scatti di 15 minuti)' }
              {' '}
              <abbr title="campo richiesto">
                *
              </abbr>
            </ControlLabel>
            <FormControl
              disabled={!!lunchbag}
              name="hour"
              type="time"
              value={hour}
              placeholder="12:15"
              onChange={e => this.handleChange(e)}
            />
            {validationErrors.hour && (
            <HelpBlock bsClass="help-block-error">
              {validationErrors.hour}
            </HelpBlock>
            )}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" type="submit" className="pull-left">
            Aggiungi
          </Button>
          <Button bsStyle="danger" onClick={onHide}>
            Annulla
          </Button>
        </Modal.Footer>
      </form>
    );
  }
}

AddReservationForm.propTypes = {
  error: PropTypes.string,
  closeAlert: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dayMeals: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.number,
    description: PropTypes.string,
    id: PropTypes.number,
  })),
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })),
  getUsers: PropTypes.func.isRequired,
  getMeals: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  moment: PropTypes.oneOf(['lunch', 'dinner']),
  view: PropTypes.oneOf(['meals', 'users']),
};

AddReservationForm.defaultProps = {
  error: '',
  dayMeals: [],
  users: [],
  moment: 'lunch',
  view: 'users',
};

const mapStateToProps = state => ({
  error: state.reservations.messages.addFormError,
  moment: state.reservations.ui.moment,
  view: state.reservations.ui.view,
  dayMeals: state.reservations.data.daymeals,
  users: state.reservations.data.users.map(({ id, name }) => ({ value: id, label: name })),
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUserList()),
  getMeals: (day, moment) => dispatch(getDayMenu(day, moment)),
  closeAlert: () => dispatch(hideErrorForm()),
  onSubmit: (state, moment) => dispatch(postReservation(state, moment)),
  onHide: () => dispatch(addModalHide()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddReservationForm));
