import Validator from 'validator';
import { isEmpty } from 'lodash';

export default function validateLogin(data) {
  const errors = {};
  console.log('Valida login', data.identifier);
  const config = { min: 3, max: undefined };
  if (!Validator.isLength(data.identifier, config)) {
    errors.identifier = `Il campo deve avere almeno ${config.min} caratteri`;
  }
  if (!Validator.isLength(data.password, config)) {
    errors.password = `Password deve avere almeno ${config.min} caratteri`;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
