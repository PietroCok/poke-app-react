import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tryAutoLogin()
      .finally(() => {
        console.log('End of auto login attempt');
        setLoading(false)
      });
  }, []);

  const login = async () => {
    console.log('user logged in');
    setIsAuthenticated(true);
    setIsOffline(false);
  };

  const setOffline = (value) => {
    console.log('user is navigating in offline mode');
    setIsOffline(!!value);
  }

  const logout = async () => {
    console.log('user logged out');
    setIsAuthenticated(false);
    setIsOffline(false);
  };

  const tryAutoLogin = async () => {
    console.log('Auto login attempt');
    // simulate login attempt
    await new Promise(resolve => setTimeout(resolve, 2000));

    await login();
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isOffline, loading, login, logout, setOffline }}>
      {children}
    </AuthContext.Provider>
  );
}
