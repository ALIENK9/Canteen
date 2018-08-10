import Validator from 'validator';
import { isEmpty } from 'lodash';

/**
 * Return true if value is truthy and doesn't match none1|2|3|4 value
 * @param {String} value
 * @return {Boolean}
 */
function isValidDish(value) {
  return value && !/^none(1|2|3|4)$/i.test(value);
}

export default function validateReservation(data, moment) {
  const errors = {};
  const hour = data.hour.trim();
  const { value: userValue } = data.user || {};
  const {
    lunchbag, maindish, sidedish, seconddish, dessert,
  } = data;

  let timePattern = new RegExp();
  if (moment === 'lunch') {
    timePattern = /^(1[1-2-3]):([0-9][0-9])|(14:00)$/gmi; // 11:00-14:00
    // /^((1[1-2-3]):(00|15|30|45))|14:00$/gmi;
  } else {
    timePattern = /^(19|20):([0-9][0-9])|21:([0-1-2][0-9]|30)$/gmi; // 19:00-21:30
    // /^((19|20):(00|15|30|45))|21:(00|15|30)$/gmi;
  }

  if (!userValue) {
    errors.user = 'L\'intestatario della prenotazione è richiesto';
  }

  // se pranzo a sacco (lunchbag) salta il controllo
  if (!lunchbag && (Validator.isEmpty(hour) || !timePattern.test(hour))) {
    errors.hour = 'Non è consentito prenotare in questo orario';
  }

  if (!lunchbag && !isValidDish(maindish) && !isValidDish(seconddish) && !isValidDish(sidedish)
    && !isValidDish(dessert)) {
    errors.dishes = 'È necessario selezionare almeno un piatto';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
