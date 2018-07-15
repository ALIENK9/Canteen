import React from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';


class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.calendarConfig = {
      onClickDay: this.redirect,
      calendarType: 'ISO 8601',
      className: 'calendar',
      activeStartDate: new Date(),
    };
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
      <div className="center">
        <Calendar {...this.calendarConfig} />
      </div>
    );
  }
}

CalendarPage.propTypes = {
  history: PropTypes.object.isRequired, // fornito da React-router
  type: PropTypes.oneOf(['reservations', 'menus']).isRequired,
};

export default CalendarPage;
