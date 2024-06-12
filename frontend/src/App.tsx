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
  const [userId, setUserId] = useState(null);

  if (isLoggedIn) {
    router = createBrowserRouter(AuthenticatedRoutes, {});
  } else {
    router = createBrowserRouter(UnAuthenticatedRoutes, {});
  }

  const login = useCallback((userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        userId: userId,
        logout: logout,
      }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
