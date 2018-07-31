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
  return [
    ...array.slice(0, index),
    value,
    ...array.slice(index),
  ];
}

export function immutableRemove(array, index) {
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
  const a = array.map((item, idx) => {
    if (index !== idx) return item;
    return {
      ...item,
      ...value,
    };
  });
  console.debug(a);
  return a;
}

/**
 * Retrieves token from sessionStorage and set Authorixzation headers.
 * If token is null return empty object, otherwise an object with Authorization key.
 * @returns {Map} With auth header (bearer)
 */
export function getAuthFieldsFromStorage() {
  const root = JSON.parse(sessionStorage.getItem('persist:root')) || { authentication: { user: { token: null } } };
  console.log('root', root, typeof root);
  const { authentication } = root;
  const { user } = JSON.parse(authentication);
  console.log('user', user);
  const { token } = user;
  const headers = token ? new Map().set('Authorization', `Bearer ${token}`) : new Map();
  console.log('getHeadersFromStorage: ', headers);
  return headers;
}
