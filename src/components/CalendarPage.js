import React from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';


class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.calendarConfig = {
      locale: 'ita-it',
      onClickDay: this.redirect,
      calendarType: 'ISO 8601',
    };
  }

  redirect(day) {
    const { history, type } = this.props;
    history.push(`/${type}/${day}`);
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