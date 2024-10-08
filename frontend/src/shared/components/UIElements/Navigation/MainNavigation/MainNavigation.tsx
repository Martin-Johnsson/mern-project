import { Link } from 'react-router-dom';
import { useState } from 'react';

import './MainNavigation.css';

import MainHeader from '../MainHeader/MainHeader';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../../Backdrop/Backdrop';

const MainNavigation: React.FC = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      {drawerIsOpen && (
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
          <nav className='main-navigation__drawer-nav'>
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button
          className='main-navigation__menu-btn'
          onClick={openDrawerHandler}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <h1 className='main-navigation__title'>
          <Link to='/'>YourPlaces </Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
