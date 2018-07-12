import { noType } from './actionTypes';

// import fetch from 'whatwg-fetch';


const fetchGet = (URL, dispatch, onStart, onSuccess, onFail) => {
  dispatch(onStart());
  return fetch(URL, { method: 'GET' })
    .then(response => Promise.all([response, response.json()]))
    .then(([response, json]) => {
      if (response.status === 200) {
        console.log('Dati ', json);
        dispatch(onSuccess(json));
      } else {
        console.log('hdsdjshkdh');
        dispatch(onFail(`Problema con la richiesta GET: ${response.status} ${response.statusText}`));
      }
    })
    .catch(err => alert(`catch: ${err}`));
};

const fetchPut = (URL, dispatch, data, onStart, onSuccess, onFail) => {
  dispatch(onStart());
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
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

// todo: dovrei inserire nell'oggetto in memori anche l'ID che viene dato al nuovo oggetto
// nella risposta del server
const fetchPost = (URL, dispatch, data, onStart, onSuccess, onFail) => {
  dispatch(onStart());
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return fetch(URL, config)
    .then(response => Promise.all([response, response.json()]))
    .then(([response, json]) => {
      if (response.status === 200 || response.status === 201) {
        dispatch(onSuccess(json));
        console.log(`posted${JSON.stringify(json)}`);
      } else {
        console.log('error posting data');
        dispatch(onFail(`Problema con la richiesta POST: ${response.status} ${response.statusText}`));
      }
    });
};


export default class Http {
  /**
   * Get data from given url, calling given functions at different moments
   * @param {String} URL
   * @param {Function} dispatch Redux-react function
   * @param {Function} onStart Function called on start of operation. Pass 'null' to ignore thi step
   * @param {Function} onSuccess Viene chiamata solo in caso di successo
   * @param {Function} onFail Viene chiamata solo in caso di fallimento
   */
  static get(URL, dispatch, onStart, onSuccess, onFail) {
    const startFunction = onStart || noType;
    return fetchGet(URL, dispatch, startFunction, onSuccess, onFail);
  }

  /**
   * Put data into given endpoint URL, with callback functions
   * @param {String} URL path to endpoint
   * @param {Function} dispatch Redux-react function
   * @param {Object} data Object to save
   * @param {Function} onStart Function called starting the PUT request
   * @param {Function} onSuccess Function called on success of the request
   * @param {Function} onFail Function called on fail
   */
  static put(URL, dispatch, data, onStart, onSuccess, onFail) {
    const startFunction = onStart || noType;
    return fetchPut(URL, dispatch, data, startFunction, onSuccess, onFail);
  }

  /**
   * Perform a DELETE request to the specified endpoint
   * @param {String} URL path to endpoint
   * @param {Function} dispatch Redux-react function
   * @param {Function} onStart Function called starting the delete request
   * or NULL if you want to do nothing
   * @param {Function} onSuccess Function called on success of the request
   * @param {Function} onFail Function called on fail
   */
  static delete(URL, dispatch, onStart, onSuccess, onFail) {
    const startFunction = onStart || noType;
    console.log('DELETE REQUEST');
    return fetchDelete(URL, dispatch, startFunction, onSuccess, onFail);
  }

  /**
   * Post data towards specified endpoint, with callback functions
   * @param {String} URL path to endpoint
   * @param {Function} dispatch Redux-react function
   * @param {Object} data Object to post
   * @param {Function} onStart Function called starting the POST request
   * @param {Function} onSuccess Function called on success of the request
   * @param {Function} onFail Function called in case of fail
   */
  static post(URL, dispatch, data, onStart, onSuccess, onFail) { // todo: vedi sopra (id)
    const startFunction = onStart || noType;
    return fetchPost(URL, dispatch, data, startFunction, onSuccess, onFail);
  }
}
