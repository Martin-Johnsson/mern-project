import { useContext, useState } from 'react';

import './PlaceItem.css';

import { IPlaceItemProps } from '../../../types/interfaces';
import Card from '../../../shared/components/UIElements/Card/Card';
import Button from '../../../shared/components/FormElements/Button/Button';
import Modal from '../../../shared/components/UIElements/Modal/Modal';
import GoogleMap from '../../../shared/components/UIElements/GoogleMap/GoogleMap';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/Http-hook/Http-hook';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';

const PlaceItem = (props: IPlaceItemProps) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const BACKEND_ASSET_URL = import.meta.env.VITE_BACKEND_ASSET_URL;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);

    try {
      await sendRequest(
        BACKEND_URL + `/places/${props.id}`,

        null,
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        },
        'DELETE'
      );
    } catch (err) {
      console.error(err);
    }
    props.onDelete(props.id);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <GoogleMap center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header={'Are you sure?'}
        footerClass={'place-item__modal-actions'}
        footer={
          <>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter
        </p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='place-item__image'>
            <img
              src={`${BACKEND_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className='place-item__info'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className='place-item_actions'>
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.userId === props.creatorId && (
              <>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
