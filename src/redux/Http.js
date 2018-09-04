import { isEmpty } from 'lodash';
import 'url-search-params-polyfill';

const NOTYPE = 'NOTYPE';
const noType = () => ({
  type: NOTYPE,
});


const genericError = error => (error && error.message === 'timeout'
  ? 'La connessione al server ha impiegato troppo tempo. Ti preghiamo di riprovare o attendere qualche minuto.'
  : 'Qualcosa è andato storto. Per favore riprova');

/**
 * Add a timeout with specified milliseconds. If promise doesn't resolve in time
 * it will be rejected with error 'timeout'
 * @param {Number} ms
 * @param {Promise} promise
 */
const withTimeout = async (ms, promise) => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('timeout'));
  }, ms);
  promise.then(resolve, reject);
});


// TODO: gestire rejection e mostrare errori decenti anche nelle altre richieste
const fetchGet = async (URL, headers, dispatch, onStart, onSuccess, onFail) => {
  dispatch(onStart());
  try {
    const response = await withTimeout(5000, fetch(URL, { method: 'GET', headers }));
    const json = await response.json(); // await response.json();
    let data;
    if (response.status === 404 && json.scope === 'db') data = null;
    else if (response.status === 200) {
      data = json;
    } else {
      const errorMessage = isEmpty(json)
        ? 'Impossibile completare la richiesta. Riprova o attendi qualche minuto'
        : json.message;
      if (!onFail || typeof onFail !== 'function') {
        return {
          error: errorMessage,
          failure: true,
        };
      }
      return dispatch(onFail(errorMessage));
    }
    if (!onSuccess || typeof onSuccess !== 'function') {
      return {
        failure: false,
        data,
      };
    }
    return dispatch(onSuccess(data));
  } catch (err) {
    if (!onFail || typeof onFail !== 'function') {
      return {
        error: genericError(err),
        failure: true,
      };
    }
    return dispatch(onFail(genericError(err)));
  }
};


const fetchPut = (URL, headers, dispatch, data, onStart, onSuccess, onFail) => {
  dispatch(onStart());
  const config = {
    method: 'PUT',
    headers,
    body: data,
  };
  return withTimeout(5000, fetch(URL, config)
    .then(response => Promise.all([response, response.json()]))
    .then(([response, json]) => {
      if (response.status === 200) {
        dispatch(onSuccess());
      } else {
        const errorMessage = isEmpty(json)
          ? 'Impossibile completare la richiesta. Riprova o attendi qualche minuto'
          : json.message;
        dispatch(onFail(errorMessage));
      }
    }))
    .catch(err => dispatch(onFail(genericError(err))));
};


const fetchDelete = (URL, headers, dispatch, onStart, onSuccess, onFail) => {
  dispatch(onStart());
  const config = {
    method: 'DELETE',
    headers,
  };
  return withTimeout(5000, fetch(URL, config)
    .then(response => Promise.all([response, response.json()]))
    .then(([response, json]) => {
      if (response.status === 200) {
        dispatch(onSuccess());
      } else {
        const errorMessage = isEmpty(json)
          ? 'Impossibile effettuare la richiesta di cancellazione'
          : json.message;
        dispatch(onFail(errorMessage));
      }
    }))
    .catch(err => dispatch(onFail(genericError(err))));
};

const fetchPost = (URL, headers, dispatch, data, onStart, onSuccess, onFail) => {
  dispatch(onStart());
  const config = {
    method: 'POST',
    headers,
    body: data,
  };

  return withTimeout(5000, fetch(URL, config)
    .then(response => Promise.all([response, response.json()]))
    .then(([response, json]) => {
      if (response.status === 200 || response.status === 201) {
        dispatch(onSuccess(json));
      } else {
        const errorMessage = isEmpty(json)
          ? 'Impossibile aggiungere i dati. Per favore riprova.'
          : json.message;
        dispatch(onFail(errorMessage));
      }
    }))
    .catch(err => dispatch(onFail(genericError(err))));
};

/* Default header put on every request */
const defaultHeaders = {
  'Content-Type': 'application/json',
};

export default class Http {
  /**
   * Get data from given url, calling given functions at different moments
   * @param {String} stringURL
   * @param {Map} headersMap Map with headers for fetch request
   * @param {Object} searchParams query params { param1: 'value', param2: '..' }
   * @param {Function} dispatch Redux-react function
   * @param {Function} onStart Function called on start of operation. Pass 'null' to ignore thi step
   * @param {Function} onSuccess Viene chiamata solo in caso di successo
   * @param {Function} onFail Viene chiamata solo in caso di fallimento
   */
  static get(stringURL, headersMap = new Map(), searchParams = null, dispatch, onStart, onSuccess,
    onFail) {
    const headers = { ...defaultHeaders };
    headersMap.forEach((v, k) => {
      headers[k] = v;
    });
    const urlParams = new URLSearchParams(searchParams || {});
    const url = new URL(stringURL);
    url.search = urlParams;
    const startFunction = onStart || noType;
    return fetchGet(url, headers, dispatch, startFunction, onSuccess, onFail);
  }

  /**
   * Put data into given endpoint URL, with callback functions
   * @param {String} stringURL path to endpoint
   * @param {Map} headersMap Map with headers for fetch request
   * @param {Function} dispatch Redux-react function
   * @param {Object} data Object to save
   * @param {Function} onStart Function called starting the PUT request
   * @param {Function} onSuccess Function called on success of the request
   * @param {Function} onFail Function called on fail
   */
  static put(stringURL, headersMap = new Map(), dispatch, data, onStart, onSuccess, onFail) {
    const headers = { ...defaultHeaders };
    headersMap.forEach((v, k) => { headers[k] = v; });
    const startFunction = onStart || noType;
    return fetchPut(stringURL, headers, dispatch, data, startFunction, onSuccess, onFail);
  }

  /**
   * Perform a DELETE request to the specified endpoint
   * @param {String} stringURL path to endpoint
   * @param {Map} headersMap Map with headers for fetch request
   * @param {Function} dispatch Redux-react function
   * @param {Function} onStart Function called starting the delete request
   * or NULL if you want to do nothing
   * @param {Function} onSuccess Function called on success of the request
   * @param {Function} onFail Function called on fail
   */
  static delete(stringURL, headersMap = new Map(), dispatch, onStart, onSuccess, onFail) {
    const headers = { ...defaultHeaders };
    headersMap.forEach((v, k) => { headers[k] = v; });
    const startFunction = onStart || noType;
    return fetchDelete(stringURL, headers, dispatch, startFunction, onSuccess, onFail);
  }

  /**
   * Post data towards specified endpoint, with callback functions
   * @param {String} stringURL path to endpoint
   * @param {Map} headersMap Map with headers for fetch request
   * @param {Function} dispatch Redux-react function
   * @param {Object} data Object to post
   * @param {Function} onStart Function called starting the POST request or null
   * @param {Function} onSuccess Function called on success of the request
   * @param {Function} onFail Function called in case of fail
   */
  static post(stringURL, headersMap = new Map(), dispatch, data, onStart, onSuccess, onFail) {
    const headers = { ...defaultHeaders };
    headersMap.forEach((v, k) => { headers[k] = v; });
    const startFunction = onStart || noType;
    return fetchPost(stringURL, headers, dispatch, data, startFunction, onSuccess, onFail);
  }

  static simpleGet(stringURL, headersMap = new Map(), searchParams = null) {
    const headers = { ...defaultHeaders };
    headersMap.forEach((v, k) => { headers[k] = v; });
    const urlParams = new URLSearchParams(searchParams || {});
    const url = new URL(stringURL);
    url.search = urlParams;
    return withTimeout(5000, fetch(url, { method: 'GET', headers }));
  }
}

// HACK: EVENTUALE VERSIONE CON UNA SOLA FETCH
/*
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

/* const fetchMethod = async (method, URL, headers, body, onStart, onSuccess, onFailure) => {
  onStart();
  const errors = {};
  try {
    const config = body ? { method, headers, body } : { method, headers };
    const response = await withTimeout(5000, fetch(URL, config));
  } catch (err) {
    errors = {
      error: genericError(err),
      failure: true,
    };
  }
  if (typeof onSuccess === 'function' && typeof onFailure === 'function') {

  }
};
*/
