import { ICardProps } from '../../../../types/Interfaces';
import './Card.css';

const Card: React.FC<ICardProps> = (props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
