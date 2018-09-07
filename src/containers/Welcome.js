import React from 'react';
import { connect } from 'react-redux';
import WelcomePage from '../components/WelcomePage';

const mapStateToProps = (state) => {
  const auth = state.authentication || {};
  let welcomeText = '';
  let welcomeBottom = null;
  if (!auth.isAuthenticated) {
    welcomeText = 'Benvenuto nel servizio mensa. Accedi per continuare';
    welcomeBottom = (<span className="welcome-page-blank" />);
  } else if (auth.user.admin) {
    welcomeText = 'Benvenuto nel pannello di amministrazione';
    welcomeBottom = (
      <div className="row height90">
        <br />
        <p>
          Da qui &egrave; possibile visualizzare, aggiungere ed eliminare i piatti, i men&ugrave;
           e le prenotazioni effettuate in ogni giornata.
        </p>
        {/* <ul id="welcome-list">
          <li>
            Dalla pagina
            {' '}
            <em>
              Gestione piatti
            </em>
            {' '}
            è possibile visualizzare tutti i piatti ed aggiungerli o eliminarli;
          </li>
          <li>
            Dalla pagina
            {' '}
            <em>
              Gestione menù
            </em>
            {' '}
              è possibile visualizzare, modificare ed eliminare il menù proposto ogni giornata
          </li>
          <li>
            Dalla pagina
            {' '}
            <em>
              Gestione prenotazioni
            </em>
            {' '}
            si possono vedere le prenotazioni effettuate in ogni giornata, oltre che
            aggiungerle e cancellarle
          </li>
    </ul> */}
        <span className="welcome-image" />
      </div>
    );
  } else {
    welcomeText = 'Benvenuto nel serivio di prenotazione pasti';
  }
  return {
    username: auth.user.name || null,
    welcomeText,
    welcomeBottom,
  };
};

export default connect(mapStateToProps)(WelcomePage);
