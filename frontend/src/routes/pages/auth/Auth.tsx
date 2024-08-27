import { useState, useContext, FormEvent } from 'react';

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
import { AuthContext } from '../../../shared/context/auth-context';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal';
import { useHttpClient } from '../../../shared/hooks/Http-hook/Http-hook';
import ImageUpload from '../../../shared/components/FormElements/ImageUpload/ImageUpload';

const Auth = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const authSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          BACKEND_URL + '/users/login',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' },
          'POST'
        );
        auth.login(
          responseData?.userId ?? '',
          responseData?.token ?? '',
          new Date()
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        const responseData = await sendRequest(
          BACKEND_URL + '/users/signup',
          formData,
          {},
          'POST'
        );
        auth.login(
          responseData?.userId ?? '',
          responseData?.token ?? '',
          new Date()
        );
      } catch (err) {
        console.error(err);
      }
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
          image: undefined,
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
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode(!isLoginMode);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? 'Login' : 'Signup'} </h2>
        <form className='place-form' onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <>
              <Input
                id='name'
                element='input'
                label='Name'
                type='text'
                errorText='Please provide a name.'
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
              <ImageUpload id='image' center onInput={inputHandler} />
            </>
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
          <Button disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
          <Button danger to='/'>
            CANCEL
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {!isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </Card>
    </>
  );
};
export default Auth;
