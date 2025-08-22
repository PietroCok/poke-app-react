import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { AuthErrorCodes, onAuthStateChanged, signOut, type User } from "firebase/auth";

import type { AuthContextType, StaticAuthContextType, UserProfile } from "@/types";

import { deleteUserAccount, firebaseAuth, firebaseSignIn, firebaseSignUp } from "../firebase/auth";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { getUserProfile } from "../firebase/db";
import { useModal } from "./ModalContext";
import { FirebaseError } from "firebase/app";

export interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);
const StaticAuthContext = createContext<StaticAuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');

  const staticCtx = useContext(StaticAuthContext);
  if (!staticCtx) throw new Error('useAuth must be used within an AuthProvider');

  return { ...staticCtx, ...ctx };
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const { showAlert } = useModal();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (_user) => {
      console.log('onAuthStateChanged', _user);

      if (_user) {
        setUser(_user);
        setIsOffline(false);

        setProfile(await getUserProfile(_user));
      } else {
        setUser(null);
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  console.log('User profile', profile);

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

  const deleteAccount = async () => {
    const result = await deleteUserAccount();
    if(result instanceof FirebaseError &&
      result.code === AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN
    ) {
      showAlert('Questa operazione richiede una autenticazione recente, eseguire nuovamente la login e riprovare');
      return {redirect: '/login'};
    }

    if(typeof result === 'string') {
      showAlert(result);
      return;
    }
  }

  const staticContextValue = useMemo(() => ({
    isUserActive: () => isUserActive(user, profile)
  }), [user, profile]);

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
    <StaticAuthContext.Provider
      value={staticContextValue}
    >
      <AuthContext.Provider
        value={{ 
          user, 
          profile, 
          isOffline, 
          login, 
          logout, 
          signUp, 
          setOffline, 
          deleteAccount 
        }}
      >
        {children}
      </AuthContext.Provider>
    </StaticAuthContext.Provider>
  );
}

const isUserActive =(user: User | null, profile: UserProfile | null) => {
  return user && profile && profile.status === 'active' || false;
}