import '../../../../assets/PlaceForm.css';
import Input from '../../../../shared/components/FormElements/Input/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../../shared/util/validators';
import Button from '../../../../shared/components/FormElements/Button/Button';
import { useForm } from '../../../../shared/hooks/Form-hook/Form-hook';
import { useHttpClient } from '../../../../shared/hooks/Http-hook';
import { useContext } from 'react';
import { AuthContext } from '../../../../shared/context/auth-context';
import LoadingSpinner from '../../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../../shared/components/UIElements/ErrorModal/ErrorModal';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../../../shared/components/FormElements/ImageUpload/ImageUpload';
const NewPlace = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
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

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', auth.userId);
      formData.append('image', formState.inputs.image.value);
      await sendRequest('http://localhost:3000/api/places', 'POST', formData);
      navigate('/');
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className='place-form' onSubmit={placeSubmitHandler}>
        {isLoading && (
          <div className='center'>
            <LoadingSpinner asOverlay />
          </div>
        )}
        <ImageUpload
          id='image'
          center
          onInput={inputHandler}
          errorText='Please provide an image.'
        />
        <Input
          id='title'
          element={'input'}
          type='text'
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title.'
          onInput={inputHandler}
        />
        <Input
          id='description'
          element={'textarea'}
          label='Description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a description ( at least 5 characters).'
          onInput={inputHandler}
        />
        <Input
          id='address'
          element={'input'}
          label='Address'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid address.'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
