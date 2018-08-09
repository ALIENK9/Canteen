import { isEmpty } from 'lodash';
import 'url-search-params-polyfill';

const NOTYPE = 'NOTYPE';
const noType = () => ({
  type: NOTYPE,
});


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
    const response = await fetch(URL, { method: 'GET', headers });
    const json = await response.json(); // await response.json();
    let data;
    if (response.status === 404 && json.scope === 'db') data = null;
    else if (response.status === 200) {
      console.log('Dati ', json);
      data = json;
    } else {
      const errorMessage = isEmpty(json)
        ? 'La richiesta GET al server è fallita'
        : json.message;
      if (!onFail || typeof onFail !== 'function') {
        return {
          error: errorMessage,
          failure: true,
        };
      }
      return dispatch(onFail(errorMessage));
    }
    console.log('OnSuccess type', onSuccess, typeof onSuccess);
    if (!onSuccess || typeof onSuccess !== 'function') {
      return {
        failure: false,
        data,
      };
    }
    return dispatch(onSuccess(data));
  } catch (err) {
    console.error(err);
    const errMessage = err.message === 'timeout' ? 'La richiesta ha impiegato troppo tempo'
      : 'Qualcosa è andato storto. Per favore riprova';
    if (!onFail || typeof onFail !== 'function') {
      return {
        error: errMessage,
        failure: true,
      };
    }
    return dispatch(onFail(errMessage));
  }

  /* return fetch(URL, { method: 'GET', headers })
    .then(response => Promise.all([response, response.json()]))
    .then(([response, json]) => {
      if (response.status === 404 && json.scope === 'db') dispatch(onSuccess(null));
      else if (response.status === 200) {
        console.log('Dati ', json);
        dispatch(onSuccess(json));
      } else {
        console.error('Errore GET in corso', response);
        console.log('Dati ', json);
        const errorMessage = isEmpty(json)
          ? 'La richiesta GET al server è fallita'
          : json.message;
        dispatch(onFail(errorMessage));
      }
    }) // HACK: metodo di callback anche qui?
    .catch(() => dispatch(onFail('Qualcosa è andato storto. Per favore riprova'))); */
};


const fetchPut = (URL, headers, dispatch, data, onStart, onSuccess, onFail) => {
  console.log('PUT data: ', data);
  dispatch(onStart());
  // const headers = getFetchHeaders();
  const config = {
    method: 'PUT',
    headers,
    body: data,
  };
  return fetch(URL, config)
    .then(response => Promise.all([response, response.json()]))
    .then(([response, json]) => {
      if (response.status === 200) {
        dispatch(onSuccess());
      } else {
        const errorMessage = isEmpty(json)
          ? `Problema con la richiesta PUT: ${response.status} ${response.statusText}`
          : json.message;
        dispatch(onFail(errorMessage));
      }
    })
    .catch(() => dispatch(onFail('Qualcosa è andato storto. Per favore riprova')));
};


const fetchDelete = (URL, headers, dispatch, onStart, onSuccess, onFail) => {
  dispatch(onStart());
  // const headers = getFetchHeaders();
  const config = {
    method: 'DELETE',
    headers,
  };
  return fetch(URL, config)
    .then(response => Promise.all([response, response.json()]))
    .then(([response, json]) => {
      if (response.status === 200) {
        console.log('deleting');
        dispatch(onSuccess());
        console.log('deleted');
      } else {
        console.log('error deleting');
        const errorMessage = isEmpty(json)
          ? `Problema con la richiesta di cancellazione. Il server ha risposto con ${response.status} ${response.statusText}`
          : json.message;
        dispatch(onFail(errorMessage));
      }
    })
    .catch(() => dispatch(onFail('Qualcosa è andato storto. Per favore riprova')));
};

const fetchPost = (URL, headers, dispatch, data, onStart, onSuccess, onFail) => {
  dispatch(onStart());
  // const headers = getFetchHeaders();
  const config = {
    method: 'POST',
    headers,
    body: data,
    // mode: 'no-cors',
  };
  console.log('Posted body', config.body);

  return fetch(URL, config)
    .then(response => Promise.all([response, response.json()]))
  // error => handleRejectionError(dispatch, onFail, error)) // gestisce il reject della fetch
    .then(([response, json]) => {
      if (response.status === 200 || response.status === 201) {
        dispatch(onSuccess(json));
        console.log(`Post response ${JSON.stringify(json)}`);
      } else {
        console.log('error posting data, response.json', json);
        console.log('Risposta', response.status, response.statusText);
        const errorMessage = isEmpty(json)
          ? 'Impossibile aggiungere i dati. Per favore riprova.'
          : json.message;
        dispatch(onFail(errorMessage));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(onFail('Qualcosa è andato storto. Per favore riprova'));
    });
};

const defaultHeaders = {
  'Content-Type': 'application/json',
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  // 'Cache-Control': 'no-cache',
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
      console.log('Chiave ', k, v, typeof k);
      headers[k] = v;
    });
    console.log('Header della GET', headers, stringURL);
    const urlParams = new URLSearchParams(searchParams || {});
    const url = new URL(stringURL);
    url.search = urlParams;
    console.log('URL', url);
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
    console.debug('Header put', defaultHeaders, headersMap);
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
    console.log('DELETE REQUEST');
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
    console.log('Posting data: ', data);
    console.log('URL: ', stringURL);
    return fetchPost(stringURL, headers, dispatch, data, startFunction, onSuccess, onFail);
  }

  static simpleGet(stringURL, headersMap = new Map(), searchParams = null) {
    const headers = { ...defaultHeaders };
    headersMap.forEach((v, k) => { headers[k] = v; });
    const urlParams = new URLSearchParams(searchParams || {});
    const url = new URL(stringURL);
    url.search = urlParams;
    console.log('simple URL', url, headers);
    return withTimeout(5000, fetch(url, { method: 'GET', headers }));
  }
}

// COSE OLD

/**
 * Return header with authorization token obtained from sessionStorage
 */
/* function getFetchHeaders() {
  const root = JSON.parse(sessionStorage.getItem('persist:root'))
  || { authentication: { user: { token: null } } };
  console.log('root', root, typeof root);
  const { authentication } = root;
  const { user } = JSON.parse(authentication);
  console.log('user', user);
  const { token } = user;
  const headers = token ? {
    'Content-Type': 'application/json',
    // 'Cache-Control': 'no-cache',
    Authorization: `Bearer ${token}`,
  } : {
    Authorization: `Basic ${btoa('sam:asd')}`,
    // 'Access-Control-Allow-Headers': 'Accept',
    'Content-Type': 'application/json',
  };
  console.log('header: ', headers);
  return headers;
} */
