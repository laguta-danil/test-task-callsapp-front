import React, { createContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  useGetUserMutation,
  useLoginMutation,
  useLogoutMutation,
} from '../store/api/auth';

interface AuthContextType {
  user: any;
  error: any;
  isError: boolean;
  signin: (username: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<any>(false);
  const [getUser, { error, isError }]: any = useGetUserMutation();
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: user }: any = await getUser();
        if (user) {
          setUser(user.username);
        }
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [getUser]);

  const signin = async (
    username: string,
    password: string,
    callback: VoidFunction,
  ) => {
    await login({ username, password });
    const { data: user }: any = await getUser();
    setUser(user?.username);
    setIsLoaded(true);
    callback();
  };

  const signout = async (callback: VoidFunction) => {
    await logout();
    setUser(null);
    callback();
  };

  const value = { user, signin, signout, error, isError };

  return (
    isLoaded && (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}

export function RequireNotAuthed({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.user) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return children;
}
