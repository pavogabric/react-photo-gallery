import { signOut, User } from '@firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase-config';

interface IAuthContext {
  user: User | undefined;
  isAuthenticated: boolean;
  error: any;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
  setUser: (user: User) => void;
}

export const AuthContext = React.createContext({
  user: undefined,
  isAuthenticated: false,
  error: null,
  onLogin: () => {},
  onLogout: () => {},
  setUser: () => {},
} as IAuthContext);

const AuthContextProvider = (props: any) => {
  const [user, setUser] = useState<User | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setUserHandler = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const loginHandler = async (email: string, password: string) => {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.log(error.code);

      if (error.code === 'auth/user-not-found') {
        setError('User not found, try again.');
      } else {
        setError(error.message);
      }
    }
  };

  const logoutHandler = async () => {
    await signOut(auth);
    setUser(undefined);
    setIsAuthenticated(false);
  };

  const contextValue = {
    user: user,
    isAuthenticated: isAuthenticated,
    error: error,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    setUser: setUserHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
