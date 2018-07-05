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
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1),
  ];
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
