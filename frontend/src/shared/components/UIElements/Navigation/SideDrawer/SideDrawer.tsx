import { useRef } from 'react';
import './SideDrawer.css';

import ReactDOM from 'react-dom';

interface ISideDrawerProps {
  onClick: () => void;
  children: React.ReactNode;
}

const SideDrawer = (props: ISideDrawerProps) => {
  const nodeRef = useRef<null | HTMLElement>(null);
  const drawerPortalRoot: HTMLElement = document.getElementById(
    'drawer-hook'
  ) as HTMLElement;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      props.onClick();
    }
  };

  const content = (
    <aside
      className='side-drawer'
      onClick={props.onClick}
      ref={nodeRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {props.children}
    </aside>
  );
  return ReactDOM.createPortal(content, drawerPortalRoot);
};

export default SideDrawer;
