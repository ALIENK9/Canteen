import React, { Component } from 'react';
import Reservation from './Reservation';
import CalendarPage from './CalendarPage';

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
class Reservations extends Component {
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
          {/* barra con servizi */}
          <CalendarPage />
        </div>
        <div id="list" className="flex-container">
          {/* lista di items */}
          {items.map((item, index) => (
            <Reservation
              {...item}
              viewList={this.state.clickedItems[index]}
              key={item.name}
              index={index}
              onClick={this.handleClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Reservations;
