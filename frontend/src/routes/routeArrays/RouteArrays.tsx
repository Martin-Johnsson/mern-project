import { RouteObject, Navigate } from 'react-router-dom';
import { lazy } from 'react';

import Users from '../pages/users/Users';
import BaseLayout from '../../shared/Layout/Layout';

const UserPlaces = lazy(() => import('../pages/places/UserPlaces/UserPlaces'));
const NewPlace = lazy(() => import('../pages/places/NewPlace/NewPlace'));
const UpdatePlace = lazy(
  () => import('../pages/places/UpdatePlace/UpdatePlace')
);
const Auth = lazy(() => import('../pages/auth/Auth'));

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
