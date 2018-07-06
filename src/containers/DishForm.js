import React, { Component } from 'react';
import {
  FormGroup, ControlLabel, FormControl, HelpBlock, Button, Radio,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postDish } from '../redux/actions/dishes.actions';

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
      type: 'Secondo',
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
    if (type && name) onSubmit(this.state);
  }

  render() {
    const { name, type, description } = this.state;
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
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
            checked={type === 'Primo' ? 'checked' : false}
            value="Primo"
            onChange={e => this.handleChange(e)}
            inline
          >
            Primo
          </Radio>
          <Radio
            name="type"
            checked={type === 'Secondo' ? 'checked' : false}
            value="Secondo"
            onChange={e => this.handleChange(e)}
            inline
          >
            Secondo
          </Radio>
          <Radio
            name="type"
            checked={type === 'Contorno' ? 'checked' : false}
            value="Contorno"
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
        <Button bsStyle="success" type="submit">
          Aggiungi
        </Button>
      </form>
    );
  }
}

DishForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // error: PropTypes.string,
  // closeAlert: PropTypes.func,
};

DishForm.defaultProps = {
  // error: null,
  // closeAlert: () => {},
};


const mapDispatchToProps = dispatch => ({
  onSubmit: state => dispatch(postDish(state)),
});

export default withRouter(connect(null, mapDispatchToProps)(DishForm));
