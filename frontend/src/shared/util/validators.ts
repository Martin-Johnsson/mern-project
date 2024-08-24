import {
  VALIDATOR_TYPE_EMAIL,
  VALIDATOR_TYPE_FILE,
  VALIDATOR_TYPE_MAX,
  VALIDATOR_TYPE_MAXLENGTH,
  VALIDATOR_TYPE_MIN,
  VALIDATOR_TYPE_MINLENGTH,
  VALIDATOR_TYPE_REQUIRE,
} from '../../types/constants';
import { IValidator } from '../../types/interfaces';
import {
  validateEmail,
  validateMax,
  validateMaxLength,
  validateMin,
  validateMinLength,
  validateRequire,
} from './helperFunctions';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (validateBy: number) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  validateBy: validateBy,
});
export const VALIDATOR_MAXLENGTH = (validateBy: number) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  validateBy: validateBy,
});
export const VALIDATOR_MIN = (validateBy: number) => ({
  type: VALIDATOR_TYPE_MIN,
  validateBy: validateBy,
});
export const VALIDATOR_MAX = (validateBy: number) => ({
  type: VALIDATOR_TYPE_MAX,
  validateBy: validateBy,
});

export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const validate = (value: string, validators: IValidator[]) => {
  let isValid = true;
  for (const validator of validators) {
    switch (validator.type) {
      case VALIDATOR_TYPE_REQUIRE:
        isValid = isValid && validateRequire(value.toString());
        break;
      case VALIDATOR_TYPE_MINLENGTH:
        isValid =
          isValid && validateMinLength(value.toString(), validator.validateBy);
        break;
      case VALIDATOR_TYPE_MAXLENGTH:
        isValid =
          isValid && validateMaxLength(value.toString(), validator.validateBy);
        break;
      case VALIDATOR_TYPE_MIN:
        isValid = isValid && validateMin(value, validator.validateBy);
        break;
      case VALIDATOR_TYPE_MAX:
        isValid = isValid && validateMax(value, validator.validateBy);
        break;
      case VALIDATOR_TYPE_EMAIL:
        isValid = isValid && validateEmail(value);
        break;
      default:
        return false;
    }
  }
  return isValid;
};
