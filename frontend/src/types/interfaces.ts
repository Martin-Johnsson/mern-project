export interface IImageUploadProps {
  id: string;
  center: boolean;
  errorText: string;
  onInput: (
    id: string,
    pickedFile: File | undefined,
    fileIsValid: boolean
  ) => void;
}

export interface IInputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

export interface IInput {
  initialValue: string;
  initialValid: boolean;
  id: string;
  onInput: (id: string, value: string, isValid: boolean) => void;
  validators: [];
  element: string;
  type: string;
  placeholder: string;
  rows: number;
  label: string;
  errorText: string;
}
