import { Link } from 'react-router-dom';

import './UserItem.css';

import Avatar from '../../../shared/components/UIElements/Avatar/Avatar';
import Card from '../../../shared/components/UIElements/Card/Card';
import { IUserItemProps } from '../../../types/interfaces';

const UserItem = (props: IUserItemProps) => {
  const BACKEND_ASSET_URL = import.meta.env.VITE_BACKEND_ASSET_URL;
  return (
    <li className='user-item'>
      <Card className='user-item__content'>
        <Link to={`/${props.id}/places`}>
          <div className='user-item__image'>
            <Avatar
              image={`${BACKEND_ASSET_URL}/${props.image}`}
              alt={props.name}
            />
          </div>
          <div className='user-item__info'>
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.count === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
