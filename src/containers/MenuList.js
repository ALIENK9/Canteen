import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { Button } from 'react-bootstrap';
import {
  toggleMeal, fetchMenuRedux, putMenuRedux, clearMessages,
} from '../redux/actions/menus.actions';
import List from '../components/List';
import CheckBox from '../components/ListItems/CheckBox';
import MenuItem from '../components/MenuItem';
import Alert from '../components/Alert';


class MenuList extends Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit();
  }

  render() {
    const {
      meals, onItemClick, match, moment, loading, error, success, closeMessage,
    } = this.props;
    const { day } = match.params;
    return (
      <div>
        {success && <Alert type="success" message={success} onDismiss={closeMessage} />}
        {error && <Alert type="danger" message={error} onDismiss={closeMessage} />}
        <div id="listbar">
          <h2>
            {moment === 'dinner' ? 'Cena' : 'Pranzo'}
            {' '}
            del giorno
            {' '}
            {day}
          </h2>
        </div>
        <PacmanLoader
          color="#123abc"
          loading={loading}
        />
        <List>
          {meals[moment].map((meal, index) => (
            <CheckBox
              key={meal.id}
              index={index}
              onClick={onItemClick}
              checked={meal.checked}
              param={moment}
            >
              <MenuItem name={meal.name} />
            </CheckBox>
          ))}
        </List>
        <div>
          <Button bsStyle="primary" type="submit" onClick={e => this.handleSubmit(e)}>
            Conferma
          </Button>
        </div>
      </div>
    );
  }
}

MenuList.propTypes = {
  meals: PropTypes.shape({
    lunch: PropTypes.arrayOf(PropTypes.object),
    dinner: PropTypes.arrayOf(PropTypes.object),
  }),
  onItemClick: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  match: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  moment: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  closeMessage: PropTypes.func.isRequired,
};

MenuList.defaultProps = {
  meals: {
    lunch: [],
    dinner: [],
  },
  loading: true, // mostra lo spinner
  error: null, // messaggio di errore oppure null
  success: null, // conferma di successo oppure null
};

const mapStateToProps = state => ({
  meals: state.menus.meals,
  loading: state.menus.loading,
  error: state.menus.error,
  success: state.menus.success,
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(fetchMenuRedux()),
  onItemClick: (id, newVal, moment) => dispatch(toggleMeal(id, newVal, moment)),
  onSubmit: () => dispatch(putMenuRedux()),
  closeMessage: () => dispatch(clearMessages()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuList));
