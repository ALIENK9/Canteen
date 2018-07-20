import Validator from 'validator';
import isEmptyObject from './validationUtils';

export default function validateLogin(data) {
  const errors = {};
  if (!Validator.isEmail(data.identifier)) {
    errors.identifier = 'The field must be an email';
  }
  if (!Validator.isLength(data.password, { min: 8, max: undefined })) {
    errors.password = 'Password must have at least 8 chars';
  }

  return {
    errors,
    isValid: isEmptyObject(errors),
  };
}