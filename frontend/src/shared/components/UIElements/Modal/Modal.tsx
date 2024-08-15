import ReactDOM from 'react-dom';

import './Modal.css';

import Backdrop from '../Backdrop/Backdrop';
import { IModalOverlayProps, IModalProps } from '../../../../types/interfaces';

const ModalOverlay: React.FC<IModalOverlayProps> = (props) => {
  const content: JSX.Element = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__foter ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  const modalHook: HTMLElement | null = document.getElementById('modal-hook');

  return ReactDOM.createPortal(content, modalHook!);
};

const Modal: React.FC<IModalProps> = (props) => {
  return (
    <>
      {props.show && (
        <>
          <Backdrop onClick={props.onCancel} /> <ModalOverlay {...props} />{' '}
        </>
      )}
    </>
  );
};

export default Modal;
