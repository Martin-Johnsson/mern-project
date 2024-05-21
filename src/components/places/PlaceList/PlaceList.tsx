import './PlaceList.css';
import Card from '../../../shared/components/UIElements/Card/Card';
import PlaceItem from '../PlaceItem/PlaceItem';

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share place</button>
        </Card>
      </div>
    );
  } else {
    return (
      <ul className='place-list'>
        {props.items.map((place) => {
          return (
            <PlaceItem
              key={place.id}
              id={place.id}
              image={place.imageUrl}
              title={place.title}
              desription={place.description}
              address={place.address}
              creatorID={place.creator}
              coordinates={place.location}
            />
          );
        })}
      </ul>
    );
  }
};

export default PlaceList;
