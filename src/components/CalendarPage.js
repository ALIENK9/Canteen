import React from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';

import { Button, Glyphicon, Panel } from 'react-bootstrap';


class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.setCurrentMonth = this.setCurrentMonth.bind(this);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    this.state = {
      currentMonth,
      currentYear,
    };
    const minDate = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(minDate - 1).getDate();
    const maxDate = new Date(currentYear, currentMonth, lastDayOfMonth);
    // HACK: eventuale contrllo per capire se è admin. Poi setta config
    this.calendarConfig = {
      onClickDay: this.redirect,
      calendarType: 'ISO 8601',
      className: 'calendar',
      // activeStartDate: new Date(),
      onActiveDateChange: this.setCurrentMonth,
      value: new Date(),
      maxDetail: 'month',
      maxDate,
      minDate,
    };
  }

  setCurrentMonth({ activeStartDate }) {
    this.setState({
      currentMonth: activeStartDate.getMonth() + 1,
      currentYear: activeStartDate.getFullYear(),
    });
  }


  redirect(day) {
    const { history, type } = this.props;
    // todo: possibilmente rimuovere 'type' in favore di un push sull'URL precedente
    const localDate = day.toISOString().substring(0, 10);
    history.push(`/${type}/${localDate}`);
    // return <Redirect to="/ciao" />;
  }

  render() {
    const { currentMonth, currentYear } = this.state;
    return (
      <div className="container">
        <Panel>
          <Panel.Heading componentClass="h1">
            Calendario
          </Panel.Heading>
          <Panel.Body>
          Scegli il giorno di cui effettuare la prenotazione
            <Calendar {...this.calendarConfig} />
          </Panel.Body>
          <Panel.Footer className="center">
            <Button bsStyle="primary">
              <span className="gliph-text">
                Scarica report
                {' '}
                {currentMonth}
                /
                {currentYear}
              </span>
              <Glyphicon glyph="glyphicon glyphicon-download-alt" />
            </Button>
          </Panel.Footer>
        </Panel>
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
