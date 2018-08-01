import Validator from 'validator';
import { isEmpty } from 'lodash';

export default function validateReservation(data) {
  const errors = {};
  const hour = data.hour.trim();

  const timePattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gmi;

  if (Validator.isEmpty(hour) || !timePattern.test(hour)) {
    errors.hour = 'Il formato dell\'orario non è corretto';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
