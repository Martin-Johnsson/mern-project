import { createContext, Context } from 'react';

import { IAuthContext } from '../../types/interfaces';

export const AuthContext: Context<IAuthContext> = createContext<IAuthContext>({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
