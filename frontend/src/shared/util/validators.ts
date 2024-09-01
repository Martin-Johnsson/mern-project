import { IValidator } from '../../types/interfaces';

const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val: number) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val: number) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val: string) => ({
  type: VALIDATOR_TYPE_MIN,
  val: val,
});
export const VALIDATOR_MAX = (val: string) => ({
  type: VALIDATOR_TYPE_MAX,
  val: val,
});

export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const validate = (value: string | number, validators: IValidator[]) => {
  let isValid = true;

  for (const validator of validators) {
    const val = validator.val ?? 0;

    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      value = value.toString();
      isValid = isValid && value.trim().length > 0;
    } else if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      value = value.toString();
      isValid = isValid && value.trim().length >= val;
    } else if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      value = value.toString();

      isValid = isValid && value.trim().length <= val;
    } else if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= val;
    } else if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= val;
    } else if (validator.type === VALIDATOR_TYPE_EMAIL) {
      value = value.toString();

      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
};
