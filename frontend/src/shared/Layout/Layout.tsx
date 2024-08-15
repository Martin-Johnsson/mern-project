import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/UIElements/Navigation/MainNavigation/MainNavigation';

const BaseLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default BaseLayout;
