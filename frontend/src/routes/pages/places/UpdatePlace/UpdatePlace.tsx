import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useContext, useEffect, useState } from 'react';

import Input from '../../../../shared/components/FormElements/Input/Input.tsx';
import Button from '../../../../shared/components/FormElements/Button/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../../shared/util/validators';
import { useForm } from '../../../../shared/hooks/Form-hook/Form-hook.ts';
import { useHttpClient } from '../../../../shared/hooks/Http-hook/Http-hook';
import LoadingSpinner from '../../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../../shared/components/UIElements/ErrorModal/ErrorModal';
import Card from '../../../../shared/components/UIElements/Card/Card';
import { AuthContext } from '../../../../shared/context/auth-context';
import { IAuthContext, IUpdatePlace } from '../../../../types/interfaces';

import '../../../../assets/PlaceForm.css';

const UpdatePlace = () => {
  const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;
  const placeId: string | undefined = useParams().placeId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState<IUpdatePlace | undefined>(
    undefined
  );
  const navigate: NavigateFunction = useNavigate();
  const auth: IAuthContext = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const loadPlace = async () => {
      try {
        const responseData = await sendRequest(
          BACKEND_URL + `/places/${placeId}`
        );

        setLoadedPlace(responseData?.place);

        setFormData(
          {
            title: {
              value: responseData?.place?.title,
              isValid: true,
            },
            description: {
              value: responseData?.place?.description,
              isValid: true,
            },
          },
          true
        );
        navigate(``);
      } catch (err) {
        console.error(err);
      }
    };

    loadPlace();
  }, [placeId, sendRequest, setFormData, BACKEND_URL, navigate]);

  const placeUpdateSubmitHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      await sendRequest(
        BACKEND_URL + `/places/${placeId}`,
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        },
        'PATCH'
      );
      navigate(`/${auth.userId}/places`);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <Card className='center'>
        <div>
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className='center'>
        <h2>Could not find place</h2>
      </div>
    );
  }

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {!isLoading && loadedPlace && (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title'
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.initialValid}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (min. 5 characters).'
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.initialValid}
          />
          <Button type='submit' disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
