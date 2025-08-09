import React, { createContext, useContext, useState, useEffect } from "react";

import type { AuthContextType } from "@/types";

import { firebaseAuth, firebaseSignIn, firebaseSignUp } from "../firebase/auth";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { LoadingSpinner } from "../components/common/LoadingSpinner";

export interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      console.log('onAuthStateChanged', user);

      if (user) {
        setUser(user);
        setIsOffline(false);
      } else {
        setUser(null);
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    return await firebaseSignIn(email, password);
  };

  const signUp = async (email: string, password: string) => {
    return await firebaseSignUp(email, password);
  }

  const setOffline = async (value: boolean) => {
    if (user) {
      await logout();
    }
    setIsOffline(value);
  }

  const logout = async () => {
    signOut(firebaseAuth);
  };

  // Shows loading screen until we know the user is for sure logged or not
  if (loading) {
    return (
      <LoadingSpinner
        color={"var(--primary-color)"}
        duration={2}
        radius={40}
      />
    )
  }

  return (
    <AuthContext.Provider
      value={{ user, isOffline, login, logout, signUp, setOffline }}
    >
      {children}
    </AuthContext.Provider>
  );
}
