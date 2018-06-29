import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Reservation from '../components/Reservation';
import List from '../components/List';
import ListItem from '../components/ListItem';
import { fetchData } from '../redux/actions';

/* eslint-disable react/prefer-stateless-function */
class ReservationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedItems: Array(props.reservations.length).fill(false),
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchData());
  }

  /* eslint-disable react/destructuring-assignment */
  handleClick(index) {
    const clickedItems = this.state.clickedItems.slice();
    clickedItems[index] = !clickedItems[index];
    const state = {
      clickedItems,
    };
    this.setState(state);
  }

  render() {
    return (
      <div>
        <div id="listbar">
          <h2>
            Giornata
            {' '}
            {this.props.match.params.day}
          </h2>
          {/* barra con servizi */}
        </div>
        <List>
          {this.props.reservations.map((item, index) => (
            <ListItem key={item.name} index={index} onClick={this.handleClick} role="button">
              <Reservation
                {...item}
                viewList={this.state.clickedItems[index]}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reservations: state.reservations,
});


ReservationsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.any.isRequired,
  reservations: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(ReservationsList);
