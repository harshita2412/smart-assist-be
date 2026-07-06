import { createContext, useContext, useState } from 'react';
import { getToken, setToken, clearToken } from '../api/client';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getToken()));

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    setToken(data.token);
    setIsAuthenticated(true);
  };

  const register = async (details) => {
    const data = await authApi.register(details);
    setToken(data.token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
