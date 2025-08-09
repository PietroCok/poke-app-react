import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { firebaseApp } from './index';
import type { UserCredential } from 'firebase/auth/cordova';
import { FirebaseError } from 'firebase/app';


export const firebaseAuth = getAuth(firebaseApp);

console.log('Firebase Auth Initialized!');

export const firebaseSignIn = async (email: string, password: string): Promise<UserCredential | FirebaseError | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    console.log(userCredential);
    return userCredential;
  } catch (error) {
    console.log(error);
    if(error instanceof FirebaseError){
      return error;
    }
  }
  return null;
}

export const firebaseSignUp = async (email: string, password: string): Promise<UserCredential | FirebaseError | null> => {
    try {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    console.log(userCredential);
    return userCredential
  } catch (error) {
    console.log(error);
    if(error instanceof FirebaseError){
      return error;
    }
  }
  return null;
}

