import React, { Component } from 'react';
import Reservation from './Reservation';
import List from './List';
import ListItem from './ListItem';
// import { Map, fromJS } from 'immutable';
// import CalendarPage from './CalendarPage';

const items = [
  {
    name: 'Pasta alla salsiccia',
    reservations: [
      'Giovanni',
      'Ciccio',
      'Palladipelo',
    ],
  },
  {
    name: 'Polenta e funghi',
    reservations: [
      'Giannoz',
      'Ciccio',
      'IO',
    ],
  },
];

/* eslint-disable react/prefer-stateless-function */
class ReservationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedItems: Array(items.length).fill(false),
    };
    this.handleClick = this.handleClick.bind(this);
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
          {items.map((item, index) => (
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

export default ReservationsList;
