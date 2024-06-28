import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from './shared/hooks/auth-hook/auth-hook';
import {
  AuthenticatedRoutes,
  UnAuthenticatedRoutes,
} from './routes/RoutesArray';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  let router;
  const { token, login, logout, userId } = useAuth();

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
