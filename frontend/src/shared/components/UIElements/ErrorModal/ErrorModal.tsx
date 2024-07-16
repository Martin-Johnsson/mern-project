import Modal from '../Modal/Modal';
import Button from '../../FormElements/Button/Button';
import { IErrorModalProps } from '../../../../types/interfaces';

const ErrorModal: React.FC<IErrorModalProps> = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header='An Error Occurred!'
      show={!!props.error}
      footer={
        <Button type='button' onClick={props.onClear}>
          Okay
        </Button>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
