import { useRef } from 'react';
import './SideDrawer.css';

import ReactDOM from 'react-dom';

const SideDrawer = (props) => {
  const nodeRef = useRef(null);

  const content = (
    <aside className='side-drawer' onClick={props.onClick} ref={nodeRef}>
      {props.children}
    </aside>
  );
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
