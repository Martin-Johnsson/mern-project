import { useParams } from 'react-router-dom';
import PlaceList from '../../../../components/places/PlaceList/PlaceList';
import { useHttpClient } from '../../../../shared/hooks/Http-hook';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../../shared/components/UIElements/ErrorModal/ErrorModal';

const UserPlaces = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const userId = useParams().userId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const responseData = await sendRequest(
          BACKEND_URL + `/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchUserPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedPlaces.length > 0 && (
        <PlaceList items={loadedPlaces} onDelete={placeDeletedHandler} />
      )}
      ;
    </>
  );
};

export default UserPlaces;
