import React, { Component } from 'react';
import {
  FormGroup, ControlLabel, FormControl, HelpBlock, Button, Radio, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postDish, hideErrorForm, hideAddForm } from '../../redux/actions/dishes/dishes.actions';
import Alert from '../../components/Alert';

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
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { type, name } = this.state;
    if (type && name) onSubmit({ ...this.state, type: Number.parseInt(type, 10) });
  }

  render() {
    const { name, type, description } = this.state;
    const { error, closeAlert, onHide } = this.props;
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <Modal.Body>
          { error && <Alert type="danger" message={error} onDismiss={closeAlert} /> }
          <FormGroup controlId="name">
            <ControlLabel>
            Nome del piatto
            </ControlLabel>
            <FormControl
              type="text"
              name="name"
              value={name}
              placeholder="Pasta al pomodoro"
              onChange={e => this.handleChange(e)}
            />
            {!name && (
            <HelpBlock bsClass="help-block-error">
            Il nome del piatto è richiesto
            </HelpBlock>
            )}
          </FormGroup>
          <FormGroup>
            {/* Radio buttons for type */}
            <p>
            Inserisci il tipo di piatto
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
