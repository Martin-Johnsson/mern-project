import './PlaceList.css';
import Card from '../../../shared/components/UIElements/Card/Card';
import PlaceItem from '../PlaceItem/PlaceItem';
import Button from '../../../shared/components/FormElements/Button/Button';

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to='/places/new'>Share place</Button>
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
              image={place.image}
              title={place.title}
              description={place.description}
              address={place.address}
              creatorId={place.creator}
              coordinates={place.location}
              onDelete={props.onDelete}
            />
          );
        })}
      </ul>
    );
  }
};

export default PlaceList;
