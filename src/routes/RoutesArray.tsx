import { RouteObject, Navigate } from 'react-router-dom';
import Users from './pages/users/Users';
import NewPlace from './pages/places/NewPlace';

export const routes: RouteObject[] = [
  {
    path: '/',
    index: true,
    element: <Users />,
  },
  {
    path: '/places/new',
    index: true,
    element: <NewPlace />,
  },

  {
    path: '*',
    element: <Navigate to='/' replace />,
  },
];
