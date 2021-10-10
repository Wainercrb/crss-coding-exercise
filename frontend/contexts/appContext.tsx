import React, { createContext, useState, FC, useEffect } from 'react';
import { fetchSignIn } from '../services/crssApi';

type TSignResponse = {
  data: {
    token: string;
    userName: string;
  };
  status: number;
};

type TContent = {
  appState: {
    isAuthenticated: boolean;
    userName: string;
    token: string;
  };
  signIn: () => void;
  signOut: () => void;
};

const AppContext = createContext({} as TContent);

const AppProvider: FC = ({ children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    userName: '',
    token: '',
  });

  useEffect(() => {
    getStoredToken();
  }, []);

  const signIn = () => {
    fetchSignIn()
      .then(({ data, status }: TSignResponse) => {
        if (status === 200) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userName', data.userName)
          setState({
            isAuthenticated: true,
            ...data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setState({
      isAuthenticated: false,
      userName: '',
      token: '',
    });
  };

  const getStoredToken = () => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    if (token && userName) {
      setState({
        isAuthenticated: true,
        userName,
        token,
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        appState: state,
        signIn,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
