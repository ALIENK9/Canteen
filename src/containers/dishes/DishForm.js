import React, { Component } from 'react';
import {
  FormGroup, ControlLabel, FormControl, HelpBlock, Button, Radio, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postDish, hideErrorForm, hideAddForm } from '../../redux/actions/dishes/dishes.actions';
import Alert from '../../components/Alert';
import validateDish from '../../validation/dishes.validator';
import SmallSpinner from '../../components/SmallSpinner';
import { mapTypeToString } from '../utils';

class DishForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '2',
      description: '',
      validationErrors: {},
    };
  }

  isValid() {
    const { errors, isValid } = validateDish(this.state);
    if (!isValid) this.setState({ validationErrors: errors });
    else this.setState({ validationErrors: {} });
    return isValid;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      const { onSubmit } = this.props;
      const { type, name, description: desc } = this.state;
      const description = desc.trim() || 'Nessuna descrizione';
      onSubmit({ name, description, type: Number.parseInt(type, 10) });
    }
  }

  render() {
    const {
      name, type, description, validationErrors,
    } = this.state;
    const {
      error, closeAlert, onHide, addLoading,
    } = this.props;
    const types = ['1', '2', '3', '4']; // aggiungere qui tipi per aggiungere opzioni
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <Modal.Body>
          { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
          <FormGroup controlId="name">
            <ControlLabel>
              Nome del piatto
              {' '}
              <abbr title="campo richiesto">
                *
              </abbr>
            </ControlLabel>
            <FormControl
              type="text"
              required
              name="name"
              value={name}
              placeholder="Pasta al pomodoro"
              onChange={e => this.handleChange(e)}
            />
            {validationErrors.name && (
            <HelpBlock bsClass="help-block-error">
              {validationErrors.name}
            </HelpBlock>
            )}
          </FormGroup>
          <FormGroup>
            {/* Radio buttons for type */}
            <p className="radio-label">
              Inserisci il tipo di piatto
              {' '}
              <abbr title="campo richiesto">
                *
              </abbr>
            </p>
            {types.map(el => (
              <Radio
                name="type"
                checked={type === el ? 'checked' : false}
                value={el}
                onChange={e => this.handleChange(e)}
                inline
              >
                {mapTypeToString(el)}
              </Radio>
            ))}

            {validationErrors.type && (
            <HelpBlock bsClass="help-block-error">
              {validationErrors.type}
            </HelpBlock>
            )}
          </FormGroup>

          <FormGroup controlId="description">
            <ControlLabel>
              Descrizione
            </ControlLabel>
            <FormControl
              componentClass="textarea"
              name="description"
              type="text"
              value={description}
              placeholder="Descrivere gli ingredienti"
              onChange={e => this.handleChange(e)}
            />
            {validationErrors.description && (
            <HelpBlock bsClass="help-block-error">
              {validationErrors.description}
            </HelpBlock>
            )}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" className="pull-left" type="submit" disabled={addLoading}>
            Aggiungi
          </Button>
          <SmallSpinner className="pull-left" loading={addLoading} />
          <Button bsStyle="danger" onClick={onHide}>
            Annulla
          </Button>
        </Modal.Footer>
      </form>
    );
  }
}

DishForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  addLoading: PropTypes.bool,
  error: PropTypes.string,
  closeAlert: PropTypes.func,
  onHide: PropTypes.func.isRequired,
};

DishForm.defaultProps = {
  addLoading: false,
  error: null,
  closeAlert: () => {},
};

const mapStateToProps = state => ({
  error: state.dishes.messages.addFormError,
  addLoading: state.dishes.ui.addLoading,
});


const mapDispatchToProps = dispatch => ({
  onSubmit: state => dispatch(postDish(state)),
  onHide: () => dispatch(hideAddForm()),
  closeAlert: () => dispatch(hideErrorForm()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DishForm));
