import React from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
import ReservationsList from './ReservationsList';
import Reservation from './Reservation';


class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.calendarConfig = {
      locale: 'it',
      onClickDay: this.redirect,
    };
  }

  redirect(day) {
    const { history, type } = this.props;
    history.push(`/${type}/${day}`);
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
