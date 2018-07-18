
/**
 * Test whether a object contains no properties (is empty) or not
 * @param {Object} object
 */
export default function isEmptyObject(object) {
  return Object.getOwnPropertyNames(object).length === 0 && object.constructor === Object;
}
