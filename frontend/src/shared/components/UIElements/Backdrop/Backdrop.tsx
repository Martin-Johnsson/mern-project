import ReactDOM from 'react-dom';

import './Backdrop.css';
import { IBackdropProps } from '../../../../types/Interfaces';



const Backdrop: React.FC<IBackdropProps> = (props) => {
  const backdropHook = document.getElementById('backdrop-hook')!;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' || event.key == ' ') {
      props.onClick!();
    }
  };

  return ReactDOM.createPortal(
    <button
      className='backdrop'
      onClick={props.onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    ></button>,
    backdropHook
  );
};
export default Backdrop;
