import { useCallback, useReducer } from 'react';

import { IFormState } from '../../../types/interfaces';

export type TFormAction =
  | {
      type: 'INPUT_CHANGE';
      inputId: keyof IFormState;
      value: string;
      isValid: boolean;
    }
  | { type: 'SET_DATA'; inputs: IFormState; formIsValid: boolean };

const formReducer = (state: IFormState, action: TFormAction) => {
  let formIsValid = true;

  switch (action.type) {
    case 'INPUT_CHANGE':
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId as keyof IFormState['inputs']]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid =
            formIsValid &&
            state.inputs[inputId as keyof IFormState['inputs']]!.isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: IFormState['inputs'],
  initialFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {

  const inputHandler = useCallback(
    (id: keyof IFormState['inputs'], value: string, isValid: boolean) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    [dispatch]
  );

  const setFormData = useCallback(
    (inputData: IFormState['inputs'], formValidity: boolean) => {
      dispatch({
        type: 'SET_DATA',
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );

  return [formState, inputHandler, setFormData];
};
