export type TInputAction =
  | { type: 'CHANGE'; val: string; validators: [] }
  | { type: 'TOUCH'; isTouched?: boolean };

export type ValidatorType =
  | 'VALIDATOR_TYPE_REQUIRE'
  | 'VALIDATOR_TYPE_MINLENGTH'
  | 'VALIDATOR_TYPE_MAXLENGTH'
  | 'VALIDATOR_TYPE_MIN'
  | 'VALIDATOR_TYPE_MAX'
  | 'VALIDATOR_TYPE_EMAIL'
  | 'VALIDATOR_TYPE_FILE';
