import Validator from 'validator';
import { isEmpty } from 'lodash';

export default function validateDish(data) {
  const errors = {};
  const name = data.name.trim();
  const description = data.description.trim();
  const { type } = data;

  const namePattern = /^([A-zèéìòùàç]+[\s\-']?)*$/mi;
  const descPattern = /^([A-z0-9èéìòùàç]+[.,;:\-"'()\s]*)*$/gmi;

  if (Validator.isEmpty(name) || !namePattern.test(name)) {
    errors.name = 'Il nome può contenere solo lettere e spazi. Il nome è richiesto.';
  }
  if (!Validator.isEmpty(description) && !descPattern.test(description)) {
    errors.description = 'Non si possono inserire caratteri speciali o simboli matematici';
  }

  if (!type) errors.type = 'Deve essere scelto un tipo';

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
