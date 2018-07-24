import React, { Component } from 'react';
import {
  FormGroup, ControlLabel, FormControl, HelpBlock, Button, Radio,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Alert from '../../components/Alert';
import { mapTypeToString } from '../utils';
import {
  getDayMeals, postReservation, hideErrorForm, getUserList,
} from '../../redux/actions/reservations/reservations.actions';

class AddReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { label: '', value: null },
      maindish: '1',
      seconddish: '5',
      sidedish: '7',
      hour: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    const {
      getUsers, getMeals, match, moment,
    } = this.props;
    const { day } = match.params;
    getMeals(day, moment);
    getUsers();
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

  handleSubmit(event) {
    event.preventDefault();
    const {
      onSubmit, moment, view, dayMeals,
    } = this.props;
    const {
      user, maindish, seconddish, sidedish, hour,
    } = this.state;

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
    const dato = {
      user: { id: user.value, name: user.label },
      // NOTE: user: Object con { name: "Nome Cognome", id: (id) }
      meals: [
        {
          id: mealsid[0],
          name: dayMeals[mealsIndex[0]].name,
        },
        {
          id: mealsid[1],
          name: dayMeals[mealsIndex[1]].name,
        },
        {
          id: mealsid[2],
          name: dayMeals[mealsIndex[2]].name,
        },
      ],
      hour,
    };
    console.log('Dato pronto per submit: ', dato);
    onSubmit(dato, moment, view);
  }

  render() {
    const { state } = this;
    const { user, hour } = state;
    const {
      error, closeAlert, dayMeals, users,
    } = this.props;
    const typesArray = [
      { type: 1, inputname: 'maindish' },
      { type: 2, inputname: 'seconddish' },
      { type: 3, inputname: 'sidedish' },
    ];

    // const users = [{ label: 'Pippo Baudo', value: 1 }, { label: 'Giovanni', value: 2 }];

    return (
      <form onSubmit={this.handleSubmit}>
        { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
        <FormGroup controlId="username">
          <ControlLabel>
            Nome e cognome
          </ControlLabel>
          {/* TODO: fare la fetch e ottenere i nomi */ console.log('Utenti', users) }
          <Select
            options={users}
            onChange={opt => this.handleSelectChange(opt)}
            placeholder="Mario Bianchi"
          />
          {// TODO: comment to be removed
          /* <FormControl
            type="text"
            name="username"
            value={username}
            placeholder="Mario Rossi"
            onChange={e => this.handleChange(e)}
          /> */}
          {!user.value && (
          <HelpBlock bsClass="help-block-error">
            L&apos;intestatario della prenotazione &egrave; richiesto
          </HelpBlock>
          )}
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
          </ControlLabel>
          <FormControl
            name="hour"
            type="time"
            value={hour}
            placeholder="12:15"
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <Button bsStyle="success" type="submit">
          Aggiungi
        </Button>
      </form>
    );
  }
}

AddReservationForm.propTypes = {
  error: PropTypes.string,
  closeAlert: PropTypes.func.isRequired,
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
  getMeals: (day, moment) => dispatch(getDayMeals(day, moment)),
  closeAlert: () => dispatch(hideErrorForm()),
  onSubmit: (state, moment) => dispatch(postReservation(state, moment)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddReservationForm));
