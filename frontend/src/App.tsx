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

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId, token) => {
    setToken(token);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  if (token) {
    router = createBrowserRouter(AuthenticatedRoutes, {});
  } else {
    router = createBrowserRouter(UnAuthenticatedRoutes, {});
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
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
