import { useNavigate, useParams } from 'react-router-dom';

import Input from '../../../../shared/components/FormElements/Input/Input';
import Button from '../../../../shared/components/FormElements/Button/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../../shared/util/validators';
import '../../../../assets/PlaceForm.css';
import { useForm } from '../../../../shared/hooks/Form-hook/Form-hook';
import { useContext, useEffect, useState } from 'react';
import { useHttpClient } from '../../../../shared/hooks/Http-hook';
import LoadingSpinner from '../../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../../shared/components/UIElements/ErrorModal/ErrorModal';
import Card from '../../../../shared/components/UIElements/Card/Card';
import { AuthContext } from '../../../../shared/context/auth-context';

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState([]);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

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
          `http://localhost:3000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place?.title,
              isValid: true,
            },
            description: {
              value: responseData.place?.description,
              isValid: true,
            },
          },
          true
        );
        navigate(``);
      } catch (err) {}
    };

    loadPlace();
  }, [placeId, sendRequest, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:3000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { 'Content-Type': 'application/json' }
      );
      navigate(`/${auth.userId}/places`);
    } catch (err) {}
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
            validators={[VALIDATOR_REQUIRE]}
            errorText='Please enter a valid title'
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (min. 5 characters).'
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
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
