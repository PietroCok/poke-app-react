import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";

import type { AuthContextType, UserProfile } from "@/types";

import { firebaseAuth, firebaseSignIn, firebaseSignUp } from "../firebase/auth";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { getUserProfile } from "../firebase/db";

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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      console.log('onAuthStateChanged', user);

      if (user) {
        setUser(user);
        setIsOffline(false);

        setProfile(await getUserProfile(user));
      } else {
        setUser(null);
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
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

    // Redirect to login should be automatic
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
      value={{ user, profile, isOffline, login, logout, signUp, setOffline }}
    >
      {children}
    </AuthContext.Provider>
  );
}
