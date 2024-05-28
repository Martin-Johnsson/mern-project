import './Auth.css';
import Input from '../../../shared/components/FormElements/Input/Input';
import { useForm } from '../../../shared/hooks/Form-hook/Form-hook';
import Button from '../../../shared/components/FormElements/Button/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../shared/util/validators';
import Card from '../../../shared/components/UIElements/Card/Card';
import { useState, useContext } from 'react';
import { AuthContext } from '../../../shared/context/auth-context';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log(formState.inputs);
    if (isLoginMode) {
      auth.login();
    }
  };

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode(!isLoginMode);
  };

  return (
    <Card className='authentication'>
      <h2>{isLoginMode ? 'Login' : 'Signup'} </h2>
      <form className='place-form' onSubmit={onSubmitHandler}>
        {!isLoginMode && (
          <Input
            id='name'
            element='input'
            label='Name'
            type='text'
            errorText='Please provide a name.'
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        )}

        <Input
          element='input'
          id='email'
          type='email'
          label='Email'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter your email address.'
          onInput={inputHandler}
        ></Input>
        <Input
          element='input'
          id='password'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText='Please enter your password, at least 8 characters'
          onInput={inputHandler}
        ></Input>
        <Button danger to='/'>
          CANCEL
        </Button>
        <Button disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Switch to {!isLoginMode ? 'LOGIN' : 'SIGNUP'}
      </Button>
    </Card>
  );
};

export default Auth;
