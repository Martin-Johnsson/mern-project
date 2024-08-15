import './Avatar.css';

import { IAvatarProps } from '../../../../types/interfaces.ts';

const Avatar: React.FC<IAvatarProps> = (props) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
