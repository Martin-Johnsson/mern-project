import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PlaceList from '../../../../components/places/PlaceList/PlaceList';
import { useHttpClient } from '../../../../shared/hooks/Http-hook/Http-hook';
import LoadingSpinner from '../../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../../shared/components/UIElements/ErrorModal/ErrorModal';
import { IPlace, IResponseData } from '../../../../types/interfaces';

const UserPlaces = () => {
  const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

  const userId: string | undefined = useParams().userId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState<[] | IPlace[]>([]);

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const responseData: IResponseData | undefined = await sendRequest(
          BACKEND_URL + `/places/user/${userId}`
        );
        setLoadedPlaces(responseData?.places || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserPlaces();
  }, [sendRequest, BACKEND_URL, userId]);

  const placeDeletedHandler = (deletedPlaceId: string) => {
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
