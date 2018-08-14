// Contiene utility utilizzate dallle azioni e dai reducer

// utilità per effettuare operazioni su Array senza effettuare side effect su alcun oggetto

/**
 * Push di 'value' in 'array'
 * @param {Array} array
 * @param {Object} value Il nuovo oggetto o valore da inserire nell'array
 */
export function immutableAdd(array, value) {
  return [
    ...array.slice(),
    value,
  ];
}

export function immutableInsert(array, index, value) {
  if (index === -1) return array;
  return [
    ...array.slice(0, index),
    value,
    ...array.slice(index),
  ];
}

export function immutableRemove(array, index) {
  if (index === -1) return array;
  const arr = [
    ...array.slice(0, index),
    ...array.slice(index + 1),
  ];
  console.log(index, arr);
  return arr;
}

/**
 * Aggiorna l'elemento in posizione 'index' effettuando una copia profonda dell'array
 * @param {Array} array
 * @param {Number} index
 * @param {Object} value Un oggetto con le sole proprietà da aggiornare
 */
export function immutableUpdate(array, index, value) {
  if (index === -1) return array;
  const a = array.map((item, idx) => {
    if (index !== idx) return item;
    return {
      ...item,
      ...value,
    };
  });
  return a;
}

/**
 * Retrieves token from sessionStorage and set Authorization headers.
 * If token is null return empty object, otherwise an object with Authorization key.
 * @returns {Map} With auth header (bearer)
 */
export function getAuthFieldsFromStorage() {
  /*
    Doppio JSON.parse() necessario per implementazione di redux-persist v5+
    Info: https://github.com/rt2zz/redux-persist/issues/489
  */
  const data = sessionStorage.getItem('persist:auth');
  if (!data) return new Map();
  // console.debug('RAW DATA', data, typeof data);
  // console.debug('PARSED DATA', rootObject, typeof rootObject);
  const { authentication } = JSON.parse(data); // || '{"token":""}';
  // console.debug('AUTH SUBOBJECT', authentication, typeof authentication);
  const { token } = JSON.parse(authentication);
  // console.debug('TOKEN', token, typeof token);
  const headers = token ? new Map().set('Authorization', `Bearer ${token}`) : new Map();
  console.debug('FINAL HEADERS:', headers);
  return headers;
}
