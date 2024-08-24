import { useReducer, useEffect } from 'react';

import './Input.css';

import { validate } from '../../../util/validators';
import { IInput, IInputState } from '../../../../types/interfaces';
import { TInputAction } from '../../../../types/types';

const inputReducer = (
  state: IInputState,
  action: TInputAction
): IInputState => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input: React.FC<IInput> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ?? '',
    isValid: false,
    isTouched: props.initialValid || false,
  });

  const { onInput } = props;

  useEffect(() => {
    onInput(props.id, inputState.value, inputState.isValid);
  }, [onInput, inputState.value, inputState.isValid, props.id]);

  const changeHandler = () => {
    dispatch({
      type: 'CHANGE',
      validators: props.validators,
      val: '',
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
