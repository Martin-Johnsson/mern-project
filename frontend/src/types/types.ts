export type TInputAction =
  | { type: 'CHANGE'; val: string; validators: [] }
  | { type: 'TOUCH' };
