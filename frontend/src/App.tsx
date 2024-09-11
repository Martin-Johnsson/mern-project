import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useMemo, Suspense } from 'react';

import './index.css';

import { useAuth } from './shared/hooks/auth-hook/auth-hook';
import {
  AuthenticatedRoutes,
  UnAuthenticatedRoutes,
} from './routes/routeArrays/RouteArrays';
import { AuthContext } from './shared/context/auth-context';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner/LoadingSpinner';

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
      <main>
        <Suspense
          fallback={
            <label className='center'>
              <LoadingSpinner />
            </label>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </main>
    </AuthContext.Provider>
  );
};

export default App;
