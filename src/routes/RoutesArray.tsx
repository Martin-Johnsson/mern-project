import { RouteObject, Navigate } from 'react-router-dom';

import Users from './pages/users/Users';
import NewPlace from './pages/places/NewPlace';
import BaseLayout from '../shared/Layout/Layout';
import UserPlaces from './pages/places/UserPlaces';

export const routes: RouteObject[] = [
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Users />,
      },
      {
        path: ':userId/places',
        element: <UserPlaces />,
        exact: true,
      },
      {
        path: 'places/new',
        element: <NewPlace />,
      },
      // {
      //   path: '*',
      //   element: <Navigate to='/' replace />,
      // },
    ],
  },
];
