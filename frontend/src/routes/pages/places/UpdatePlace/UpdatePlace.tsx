import { useParams } from 'react-router-dom';
import Input from '../../../../shared/components/FormElements/Input/Input';
import Button from '../../../../shared/components/FormElements/Button/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../../shared/util/validators';
import '../../../../assets/PlaceForm.css';
import { useForm } from '../../../../shared/hooks/Form-hook/Form-hook';
import { useEffect, useState } from 'react';
import Card from '../../../../shared/components/UIElements/Card/Card';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Manhattan_at_Dusk_by_slonecker.jpg/800px-Manhattan_at_Dusk_by_slonecker.jpg',
    address: '20 W 34th St, New York, NY 10118, United States',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Emp State Building',
    description: 'One of the most famous sky scrapers in the world',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Manhattan_at_Dusk_by_slonecker.jpg/800px-Manhattan_at_Dusk_by_slonecker.jpg',
    address: '20 W 34th St, New York, NY 10118, United States',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 'u2',
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

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

  const identifiedPlace = DUMMY_PLACES.find((places) => places.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace?.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace?.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, []);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();

    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <h2>Could not find place</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <div className='center'>
          <h2>Loading...</h2>
        </div>
      </Card>
    );
  }
  return (
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
        label='description'
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
  );
};

export default UpdatePlace;
