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

/*
  Nome: string
  Tipo: Primo | Secondo | Contorno
  Descrizione: string
*/


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
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      const { onSubmit } = this.props;
      const { type, name, description } = this.state;
      onSubmit({ name, description, type: Number.parseInt(type, 10) });
    }
  }

  render() {
    const {
      name, type, description, validationErrors,
    } = this.state;
    const { error, closeAlert, onHide } = this.props;
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
          <FormGroup required>
            {/* Radio buttons for type */}
            <p className="radio-label">
              Inserisci il tipo di piatto
              {' '}
              <abbr title="campo richiesto">
                *
              </abbr>
            </p>
            <Radio
              name="type"
              checked={type === '1' ? 'checked' : false}
              value="1"
              onChange={e => this.handleChange(e)}
              inline
            >
              Primo
            </Radio>
            <Radio
              name="type"
              checked={type === '2' ? 'checked' : false}
              value="2"
              onChange={e => this.handleChange(e)}
              inline
            >
              Secondo
            </Radio>
            <Radio
              name="type"
              checked={type === '3' ? 'checked' : false}
              value="3"
              onChange={e => this.handleChange(e)}
              inline
            >
              Contorno
            </Radio>
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
          <Button bsStyle="success" type="submit">
            Aggiungi
          </Button>
          <Button bsStyle="danger" onClick={onHide} className="pull-left">
            Annulla
          </Button>
        </Modal.Footer>
      </form>
    );
  }
}

DishForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  closeAlert: PropTypes.func,
  onHide: PropTypes.func.isRequired,
};

DishForm.defaultProps = {
  error: null,
  closeAlert: () => {},
};

const mapStateToProps = state => ({
  error: state.dishes.messages.addFormError,
});


const mapDispatchToProps = dispatch => ({
  onSubmit: state => dispatch(postDish(state)),
  onHide: () => dispatch(hideAddForm()),
  closeAlert: () => dispatch(hideErrorForm()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DishForm));
