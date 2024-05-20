import { RouteObject, Navigate } from 'react-router-dom';
import Users from './pages/users/Users';
import NewPlace from './pages/places/NewPlace';
import BaseLayout from '../components/shared/Layout/Layout';

export const routes: RouteObject[] = [
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        index: true,
        element: <Users />,
      },
      {
        path: '/places/new',
        element: <NewPlace />,
      },
      {
        path: '*',
        element: <Navigate to='/' replace />,
      },
    ],
  },
];
