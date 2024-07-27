import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from './shared/hooks/auth-hook/auth-hook';
import {
  AuthenticatedRoutes,
  UnAuthenticatedRoutes,
} from './routes/RoutesArray';
import { AuthContext } from './shared/context/auth-context';
import { useMemo } from 'react';

const App = () => {
  let router: ReturnType<typeof createBrowserRouter>;
  const { token, login, logout, userId } = useAuth();

  if (token) {
    router = createBrowserRouter(AuthenticatedRoutes, {});
  } else {
    router = createBrowserRouter(UnAuthenticatedRoutes, {});
  }

  const authContextValues = useMemo(
    () => ({
      isLoggedIn: !!token,
      token: token,
      userId: userId,

      login: login,
      logout: logout,
    }),
    [token, userId, login, logout]
  );

  return (
    <AuthContext.Provider value={authContextValues}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
