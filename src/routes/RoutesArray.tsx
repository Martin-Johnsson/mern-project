import { RouteObject, Navigate } from 'react-router-dom';

import Users from './pages/users/Users';
import NewPlace from './pages/places/NewPlace/NewPlace';
import BaseLayout from '../shared/Layout/Layout';
import UserPlaces from './pages/places/UserPlaces/UserPlaces';
import UpdatePlace from './pages/places/UpdatePlace/UpdatePlace';
import Auth from './pages/auth/Auth';

export const AuthenticatedRoutes: RouteObject[] = [
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
      },
      {
        path: 'places/new',
        element: <NewPlace />,
      },
      {
        path: 'places/:placeId',
        element: <UpdatePlace />,
      },
      {
        path: '*',
        element: <Navigate to='/' replace />,
      },
    ],
  },
];

export const UnAuthenticatedRoutes: RouteObject[] = [
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
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: '*',
        element: <Navigate to='/auth' replace />,
      },
    ],
  },
];
