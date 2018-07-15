import React, { Component } from 'react';
import {
  FormGroup, ControlLabel, FormControl, HelpBlock, Button, Radio,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Alert from '../../components/Alert';
import { mapTypeToString } from '../utils';
import { getDayMeals, clearMessages, postReservation } from '../../redux/actions/reservations/reservations.actions';

class AddReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      maindish: '',
      seconddish: '',
      sidedish: '',
      hour: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getMeals, match, moment } = this.props;
    const { day } = match.params;
    getMeals(day, moment);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      onSubmit, moment, view, dayMeals,
    } = this.props;
    const {
      username, maindish, seconddish, sidedish, hour,
    } = this.state;

    // campi obbbligatori
    if (!username || !maindish || !seconddish || !sidedish) return;

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
      name: username,
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
    console.log('Dato propnto: ', dato);
    onSubmit(dato, moment, view);
  }

  render() {
    const { state } = this;
    const { username, hour } = state;
    const { error, closeAlert, dayMeals } = this.props;
    const typesArray = [
      { type: 1, inputname: 'maindish' },
      { type: 2, inputname: 'seconddish' },
      { type: 3, inputname: 'sidedish' },
    ];

    return (
      <form onSubmit={this.handleSubmit}>
        { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
        <FormGroup controlId="username">
          <ControlLabel>
            Nome e cognome
          </ControlLabel>
          <FormControl
            type="text"
            name="username"
            value={username}
            placeholder="Mario Rossi"
            onChange={e => this.handleChange(e)}
          />
          {!username && (
          <HelpBlock bsClass="help-block-error">
            L&apos;intestatario della prenotazione &egrave; richiesto
          </HelpBlock>
          )}
        </FormGroup>
        {typesArray.map(obj => (
          <FormGroup>
            <p>
              Scegli il
              {' '}
              {mapTypeToString(obj.type).toLowerCase()}
            </p>
            { dayMeals.filter(meal => meal.type === obj.type).map(meal => (
              <Radio
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
  getMeals: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  moment: PropTypes.oneOf(['lunch', 'dinner']),
};

AddReservationForm.defaultProps = {
  error: '',
  dayMeals: [],
  moment: 'lunch',
};

const mapStateToProps = state => ({
  error: state.reservations.messages.error,
  moment: state.reservations.ui.moment,
  view: state.reservations.ui.view,
  dayMeals: state.reservations.data.daymeals,
});

const mapDispatchToProps = dispatch => ({
  getMeals: (day, moment) => dispatch(getDayMeals(day, moment)),
  closeAlert: () => dispatch(clearMessages()),
  onSubmit: (state, moment) => dispatch(postReservation(state, moment)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddReservationForm));
