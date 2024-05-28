import { useCallback, useState } from 'react';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  AuthenticatedRoutes,
  UnAuthenticatedRoutes,
} from './routes/RoutesArray';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  let router;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    router = createBrowserRouter(AuthenticatedRoutes, {});
  } else {
    router = createBrowserRouter(UnAuthenticatedRoutes, {});
  }

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
