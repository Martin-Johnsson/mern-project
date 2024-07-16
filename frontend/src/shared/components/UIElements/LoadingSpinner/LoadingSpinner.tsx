import { ILoadingSpinnerProps } from '../../../../types/Interfaces';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = (props) => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className='lds-dual-ring'></div>
    </div>
  );
};

export default LoadingSpinner;
