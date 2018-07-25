import React from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';

import { Button, Glyphicon } from 'react-bootstrap';


class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.state = {
      currentMonth: new Date().getMonth(),
    };
    this.calendarConfig = {
      onClickDay: this.redirect,
      calendarType: 'ISO 8601',
      className: 'calendar',
      activeStartDate: new Date(),
      onActiveDateChange: this.setCurrentMonth,
    };
  }

  setCurrentMonth({ activeStartDate, view }) {
    alert(`Cambiato${activeStartDate} ${view}`);
    this.setState({ currentMonth: view });
  }


  redirect(day) {
    const { history, type } = this.props;
    // todo: possibilmente rimuovere 'type' in favore di un push sull'URL precedente
    const localDate = day.toISOString().substring(0, 10);
    history.push(`/${type}/${localDate}`);
    // return <Redirect to="/ciao" />;
  }

  render() {
    return (
      <div className="container">
        <Calendar {...this.calendarConfig} />
        <Button onChange>
          <Glyphicon gliph="glyphicon download-alt" />
          Scarica report
        </Button>
      </div>
    );
  }
}

// usare onActiveDateChange prop per aggiungere button report
CalendarPage.propTypes = {
  history: PropTypes.object.isRequired, // fornito da React-router
  type: PropTypes.oneOf(['reservations', 'menus']).isRequired,
};

export default CalendarPage;
