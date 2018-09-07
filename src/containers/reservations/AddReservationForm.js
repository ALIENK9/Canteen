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
import Loader from '../../components/Loader';
import SmallSpinner from '../../components/SmallSpinner';

class AddReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { label: '', value: null },
      maindish: 'none1',
      seconddish: 'none2',
      sidedish: 'none3',
      dessert: 'none4',
      lunchbag: false,
      hour: '',
      validationErrors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    this.setState({ lunchbag: checked, hour: '' });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.isValid()) return;

    const {
      onSubmit, moment, view, dayMeals, match,
    } = this.props;
    const {
      user, maindish, seconddish, sidedish, hour, lunchbag, dessert,
    } = this.state;
    const { day } = match.params;

    // APPROSSIMA L'ORARIO AL QUARTO D'ORA PIÙ VICINO
    const [hours, minutes] = hour.split(':');
    const dateHour = new Date(2000, 1, 1, Number.parseInt(hours, 10), Number.parseInt(minutes, 10));
    dateHour.setMinutes(dateHour.getMinutes() - (dateHour.getMinutes() % 15));
    const h = dateHour.getHours().toString();
    const m = dateHour.getMinutes().toString();

    // OTTIENE DALL'ID IL NOME DELLA PIETANZA DA MOSTRARE
    const onlyIds = dayMeals.map(meal => meal.id);
    const mealsIndex = [ // indici degli elementi scelti nel form, all'interno dell'array dayMeals
      onlyIds.indexOf(maindish),
      onlyIds.indexOf(seconddish),
      onlyIds.indexOf(sidedish),
      onlyIds.indexOf(dessert),
    ];
    // ----------------------FINE----------------------------------------------
    const userSubmit = { id: user.value, name: user.label };

    const selectedList = mealsIndex.filter(id => id !== -1);
    // elimina dalla lista gli utenti che hanno già una prenotazione
    const dato = !lunchbag ? {
      user: userSubmit,
      meals: selectedList.map(id => ({
        id: dayMeals[id].id,
        name: dayMeals[id].name,
        type: dayMeals[id].type,
      })),
      date: day,
      moment,
      hour: `${h}:${m}`.trim(),
    } : {
      user: userSubmit,
      meals: [
        {
          id: 'panino_id',
          name: 'Panino al sacco',
          type: 1,
        },
      ],
      date: day,
      moment,
      hour: '--:--',
    };
    onSubmit(dato, moment, view);
  }

  render() {
    const { state } = this;
    const {
      hour, lunchbag, validationErrors,
    } = state;
    const {
      error, closeAlert, dayMeals, users, onHide, moment, list, getLoading, postLoading,
    } = this.props;
    const typesArray = [
      { type: 1, inputname: 'maindish' },
      { type: 2, inputname: 'seconddish' },
      { type: 3, inputname: 'sidedish' },
      { type: 4, inputname: 'dessert' },
    ];
    const unsernameInput = 'username';
    const userResList = list.map(res => res.user.id);


    return (
      <form onSubmit={this.handleSubmit}>
        <Modal.Body>
          { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
          <Loader loading={getLoading} />
          <FormGroup>
            <label htmlFor={unsernameInput}>
              Nome utente
              {' '}
              <abbr title="campo richiesto">
                *
              </abbr>
            </label>
            <Select
              options={users.filter(u => !userResList.includes(u.value))}
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

          <fieldset>
            <legend className="accessibility">
              Menù
            </legend>
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
                <Radio
                  key={`none${obj.type}`}
                  id={`none${obj.type}`}
                  value={`none${obj.type}`}
                  name={obj.inputname}
                  checked={state[obj.inputname] === `none${obj.type}`}
                  onChange={e => this.handleChange(e)}
                  disabled={!!lunchbag}
                  inline
                >
                Nessuno
                </Radio>
              </FormGroup>
            ))}
            {validationErrors.dishes && (
            <HelpBlock bsClass="help-block-error">
              {validationErrors.dishes}
            </HelpBlock>
            )}
          </fieldset>

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
          { Array.isArray(dayMeals) && dayMeals.length ? (
            <React.Fragment>
              <Button bsStyle="success" type="submit" className="pull-left">
                Aggiungi
              </Button>
              <SmallSpinner className="pull-left" loading={postLoading} />
            </React.Fragment>
          ) : (
            <p className="help-block-error pull-left">
              Nessun piatto nel men&ugrave; di oggi
            </p>
          ) }
          <Button bsStyle="danger" onClick={onHide}>
            Annulla
          </Button>
        </Modal.Footer>
      </form>
    );
  }
}

AddReservationForm.propTypes = {
  list: PropTypes.array,
  error: PropTypes.string,
  closeAlert: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dayMeals: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.number,
    description: PropTypes.string,
    id: PropTypes.string,
  })),
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  })),
  getUsers: PropTypes.func.isRequired,
  getMeals: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  moment: PropTypes.oneOf(['lunch', 'dinner']),
  view: PropTypes.oneOf(['meals', 'users']),
  getLoading: PropTypes.bool,
  postLoading: PropTypes.bool,
};

AddReservationForm.defaultProps = {
  list: [],
  error: '',
  dayMeals: [],
  users: [],
  moment: 'lunch',
  view: 'users',
  getLoading: true,
  postLoading: false,
};

const mapStateToProps = state => ({
  error: state.reservations.messages.addFormError,
  getLoading: state.reservations.ui.formDataLoading,
  postLoading: state.reservations.ui.addLoading,
  moment: state.reservations.ui.moment,
  view: state.reservations.ui.view,
  dayMeals: state.reservations.data.daymeals,
  list: state.reservations.data.list,
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
