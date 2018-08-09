import React from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Button, Glyphicon, Panel } from 'react-bootstrap';
import Http from '../redux/Http';
import baseURLs from '../redux/actions/baseURLs';
import { getAuthFieldsFromStorage } from '../redux/utils';
import Alert from './Alert';
import SmallSpinner from './SmallSpinner';


class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.downloadReport = this.downloadReport.bind(this);
    this.setCurrentMonth = this.setCurrentMonth.bind(this);
    this.removeError = this.removeError.bind(this);
    const currentMonth = new Date().getMonth().toLocaleString('en', { minimumIntegerDigits: 2 });
    const currentYear = new Date().getFullYear();
    this.state = {
      loading: false,
      error: '',
      currentMonth,
      currentYear,
    };
    console.log(currentMonth);
    // const minDate = new Date(currentYear, 6, 1);
    // const lastDayOfMonth = new Date(minDate - 1).getDate();
    // const maxDate = new Date(currentYear, currentMonth, lastDayOfMonth);
    // note: eventuale contrllo per capire se è admin. Poi setta config
    this.calendarConfig = {
      onClickDay: this.redirect,
      calendarType: 'ISO 8601',
      className: 'calendar',
      // activeStartDate: new Date(),
      onActiveDateChange: this.setCurrentMonth,
      value: new Date(),
      maxDetail: 'month',
      // maxDate,
      // minDate,
    };
  }

  setCurrentMonth({ activeStartDate }) {
    this.setState({
      currentMonth: activeStartDate.getMonth().toLocaleString('en', { minimumIntegerDigits: 2 }),
      currentYear: activeStartDate.getFullYear(),
    });
  }

  async downloadReport() {
    const headers = getAuthFieldsFromStorage()// header per file xlsx
    // .set('Content-Type', 'application/vnd.ms-excel'); // Map
      .set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Map
    const URL = baseURLs.report;
    const { currentMonth, currentYear: year } = this.state;
    const month = (Number.parseInt(currentMonth, 10) + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
    this.setState({ loading: true });
    try {
      const params = { month, year };
      const response = await Http.simpleGet(URL, headers, params);
      const file = await response.blob();
      file.lastModifiedDate = new Date();
      file.name = `report-${month}-${year}.xlsx`;
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      const url = window.URL.createObjectURL(file); // crea link per scaricare
      a.href = url;
      a.download = `report-${month}-${year}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
      // elimina il link dicendo al browser di non mantenere riferimenti
    } catch (err) {
      this.setState({
        loading: false,
        error: 'C\'è stato un errore scaricando il file',
      });
    }
    this.setState({ loading: false });
  }

  removeError() {
    this.setState({ error: '' });
  }

  redirect(date) {
    const { history, type } = this.props;
    // todo: possibilmente rimuovere 'type' in favore di un push sull'URL precedente
    const localDate = (new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))
      .toISOString().substring(0, 10);
    history.push(`/${type}/${localDate}`);
    // return <Redirect to="/ciao" />;
  }

  render() {
    const {
      currentMonth, currentYear, error, loading,
    } = this.state;
    const { type } = this.props;
    return (
      <div className="container">
        <Panel>
          {error && <Alert message={error} type="danger" onDismiss={this.removeError} />}
          <DocumentTitle title={`Calendario | ${type === 'reservations' ? 'Prenotazioni' : 'Menu'}`} />
          <Panel.Heading componentClass="h1">
            Calendario
          </Panel.Heading>
          <Panel.Body>
            <p>
              Scegli il giorno di cui effettuare la prenotazione
            </p>
            <Calendar {...this.calendarConfig} />
          </Panel.Body>
          <Panel.Footer className="center">
            <Button bsStyle="primary" onClick={this.downloadReport} disabled={loading}>
              <span className="gliph-text">
                Scarica report
                {' '}
                {Number.parseInt(currentMonth, 10) + 1}
                /
                {currentYear}
              </span>
              <Glyphicon glyph="glyphicon glyphicon-download-alt" />
            </Button>
            <SmallSpinner loading={loading} />
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
