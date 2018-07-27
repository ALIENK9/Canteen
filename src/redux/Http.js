import { isEmpty } from 'lodash';
import { noType } from './actionTypes';

// todo: per gli errori servità mostrare anche l'errore inviato dal server nel body della response

/**
 * Return header with authorization token obtained from sessionStorage
 */
function getFetchHeaders() {
  const root = JSON.parse(sessionStorage.getItem('persist:root')) || { authentication: { user: { token: null } } };
  console.log('root', root, typeof root);
  const { authentication } = root;
  const { user } = JSON.parse(authentication);
  console.log('user', user);
  const { token } = user;
  const headers = true ? {
    'Content-Type': 'application/json',
    // 'Cache-Control': 'no-cache',
    Authorization: `Bearer ${token}`,
  } : {
    // Authorization: 'Basic c3ByaW5nZGV2OnRlc3Q=',
    // 'Access-Control-Allow-Headers': 'Accept',
    'Content-Type': 'application/json',
  };
  console.log('header: ', headers);
  return headers;
}

/**
 * Utility to dispatch onFail action with provided error
 * @param {Function} dispatch redux dispatch function
 * @param {Function} onFail action creator to be dispatched on fail with error
 * @param {String} error the error message returned with rejection
 */
function handleRejectionError(dispatch, onFail, error) {
  console.debug('Rejecting serius');
  return Promise.reject(dispatch(onFail(`C'è stato un errore di connessione al server:
   controlla la connessione o attendi qualche minuto. L'errore completo è: ${error}`)));
  // return [{}, {}];
}

// TODO: gestire rejection e mostrare errori decenti anche nelle altre richieste
const fetchGet = (URL, dispatch, onStart, onSuccess, onFail) => {
  dispatch(onStart());
  const headers = getFetchHeaders();
  return fetch(URL, { method: 'GET', headers })
    .then(response => Promise.all([response, response.json()]),
      error => handleRejectionError(dispatch, onFail, error)) // gestisce il reject della fetch
    .then(([response, json]) => {
      if (response.status === 200) {
        console.log('Dati ', json);
        dispatch(onSuccess(json));
      } else {
        console.error('Errore GET in corso', response);
        const errorMessage = isEmpty(response)
          ? 'Errore: la richiesta GET al server non ha ricevuto risposta'
          : `Errore: la richiesta GET è fallita con il seguente codice ${response.status} ${response.statusText}`;
        dispatch(onFail(errorMessage));
      }
    }).catch(err => alert(`ERRORE GROSSO${JSON.stringify(err)}`));
  // .catch(err => dispatch(onFail(`Eccezione: probabimente il server non risponde:\n ${err}`)));
};


const fetchPut = (URL, dispatch, data, onStart, onSuccess, onFail) => {
  console.log('PUT data: ', data);
  dispatch(onStart());
  const headers = getFetchHeaders();
  const config = {
    method: 'PUT',
    headers,
    body: data,
  };
  return fetch(URL, config)
    .then(response => Promise.all([response]))
    .then(([response]) => {
      if (response.ok === true) {
        dispatch(onSuccess());
      } else {
        dispatch(onFail(`Problema con la richiesta PUT: ${response.status} ${response.statusText}`));
      }
    });
};


const fetchDelete = (URL, dispatch, onStart, onSuccess, onFail) => {
  dispatch(onStart());
  const headers = getFetchHeaders();
  const config = {
    method: 'DELETE',
    headers,
  };
  return fetch(URL, config)
    .then(response => Promise.all([response]))
    .then(([response]) => {
      if (response.status === 200) {
        console.log('deleting');
        dispatch(onSuccess());
        console.log('deleted');
      } else {
        console.log('error deleting');
        dispatch(onFail(`Problema con la richiesta DELETE: ${response.status} ${response.statusText}`));
      }
    });
};

const fetchPost = (URL, dispatch, data, onStart, onSuccess, onFail) => {
  dispatch(onStart());
  const headers = getFetchHeaders();
  const config = {
    method: 'POST',
    headers,
    body: data,
    // mode: 'no-cors',
  };
  console.log('Posted body', config.body);

  return fetch(URL, config)
    .then(response => Promise.all([response, response.json()]),
      error => handleRejectionError(dispatch, onFail, error)) // gestisce il reject della fetch
    .then(([response, json]) => {
      if (response.status === 200 || response.status === 201) {
        dispatch(onSuccess(json));
        console.log(`Post response ${JSON.stringify(json)}`);
      } else {
        console.log('error posting data, response.json', json);
        console.log('Risposta', response.status, response.statusText);
        dispatch(onFail(`Problema con la richiesta POST: ${response.status} ${response.statusText}`));
      }
    });
};


export default class Http {
  /**
   * Get data from given url, calling given functions at different moments
   * @param {String} stringURL
   * @param {Object} searchParams query params { param1: 'value', param2: '..' }
   * @param {Function} dispatch Redux-react function
   * @param {Function} onStart Function called on start of operation. Pass 'null' to ignore thi step
   * @param {Function} onSuccess Viene chiamata solo in caso di successo
   * @param {Function} onFail Viene chiamata solo in caso di fallimento
   */
  static get(stringURL, searchParams, dispatch, onStart, onSuccess, onFail) {
    const urlParams = new URLSearchParams(searchParams || {});
    const url = new URL(stringURL);
    url.search = urlParams;
    const startFunction = onStart || noType;
    return fetchGet(url, dispatch, startFunction, onSuccess, onFail);
  }

  /**
   * Put data into given endpoint URL, with callback functions
   * @param {String} stringURL path to endpoint
   * @param {Function} dispatch Redux-react function
   * @param {Object} data Object to save
   * @param {Function} onStart Function called starting the PUT request
   * @param {Function} onSuccess Function called on success of the request
   * @param {Function} onFail Function called on fail
   */
  static put(stringURL, dispatch, data, onStart, onSuccess, onFail) {
    const startFunction = onStart || noType;
    return fetchPut(stringURL, dispatch, data, startFunction, onSuccess, onFail);
  }

  /**
   * Perform a DELETE request to the specified endpoint
   * @param {String} stringURL path to endpoint
   * @param {Function} dispatch Redux-react function
   * @param {Function} onStart Function called starting the delete request
   * or NULL if you want to do nothing
   * @param {Function} onSuccess Function called on success of the request
   * @param {Function} onFail Function called on fail
   */
  static delete(stringURL, dispatch, onStart, onSuccess, onFail) {
    const startFunction = onStart || noType;
    console.log('DELETE REQUEST');
    return fetchDelete(stringURL, dispatch, startFunction, onSuccess, onFail);
  }

  /**
   * Post data towards specified endpoint, with callback functions
   * @param {String} stringURL path to endpoint
   * @param {Function} dispatch Redux-react function
   * @param {Object} data Object to post
   * @param {Function} onStart Function called starting the POST request
   * @param {Function} onSuccess Function called on success of the request
   * @param {Function} onFail Function called in case of fail
   */
  static post(stringURL, dispatch, data, onStart, onSuccess, onFail) { // todo: vedi sopra (id)
    const startFunction = onStart || noType;
    console.log('Posting data: ', data);
    console.log('URL: ', stringURL);
    return fetchPost(stringURL, dispatch, data, startFunction, onSuccess, onFail);
  }
}
