import Validator from 'validator';
import { isEmpty } from 'lodash';

export default function validateReservation(data, moment) {
  const errors = {};
  const hour = data.hour.trim();
  const { value: userValue } = data.user;
  const { lunchbag } = data;

  let timePattern = new RegExp();
  // /^([0-9]|0[0-9]|1[0-9]|2[0-3]):(00|15|30|45)$/gmi;
  if (moment === 'lunch') {
    timePattern = /^((1[1-2-3]):(00|15|30|45))|14:00$/gmi; // 11:00-14:00
  // [0-5][0-9]
  } else {
    timePattern = /^((19|20):(00|15|30|45))|21:(00|15|30)$/gmi;
  }

  if (!userValue) {
    errors.user = 'L\'intestatario della prenotazione è richiesto';
  }

  // se pranzo a sacco (lunchbag) salta il controllo
  if (!lunchbag && (Validator.isEmpty(hour) || !timePattern.test(hour))) {
    errors.hour = 'Il formato dell\'orario non è corretto';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
