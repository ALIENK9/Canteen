import Validator from 'validator';
import { isEmpty } from 'lodash';

export default function validateLogin(data) {
  const errors = {};
  console.log('Valida login', data.identifier);
  if (!Validator.isEmail(data.identifier, { require_tld: false })) { // fixme: è idiota
    // errors.identifier = 'Il campo deve contenere una email valida';
  }
  const config = { min: 3, max: undefined };
  if (!Validator.isLength(data.password, config)) {
    errors.password = `Password deve avere almeno ${config.min} caratteri`;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
