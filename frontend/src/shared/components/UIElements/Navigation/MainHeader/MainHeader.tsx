import './MainHeader.css';

import { IMainHeaderProps } from '../../../../../types/interfaces';

const MainHeader: React.FC<IMainHeaderProps> = (props) => {
  return <header className='main-header'>{props.children}</header>;
};

export default MainHeader;
