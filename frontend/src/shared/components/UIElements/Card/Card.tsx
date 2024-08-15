import './Card.css';

import { ICardProps } from '../../../../types/interfaces';

const Card: React.FC<ICardProps> = (props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
