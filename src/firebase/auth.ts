import { createUserWithEmailAndPassword, deleteUser, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';

import { firebaseApp } from './index';
import type { UserCredential } from 'firebase/auth/cordova';
import { FirebaseError } from 'firebase/app';
import { deleteUserRecord } from './db';


export const firebaseAuth = getAuth(firebaseApp);

console.log('Firebase Auth Initialized!');

export const firebaseSignIn = async (email: string, password: string): Promise<UserCredential | FirebaseError | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    console.log(userCredential);
    return userCredential;
  } catch (error) {
    console.log(error);
    if (error instanceof FirebaseError) {
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
    if (error instanceof FirebaseError) {
      return error;
    }
  }
  return null;
}

export const resetUserPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(firebaseAuth, email);
    return null;
  } catch (error) {
    console.warn(error);
    return { error: error };
  }
}


export const deleteUserAccount = async () => {
  if (!firebaseAuth.currentUser) return 'User not logged';

  const userUid = firebaseAuth.currentUser.uid;

  try {
    // This is a "safe" operation
    // If a user logs in without a record in the db, a record is automatically created
    // this operation only deletes own shared carts, shared cart "invitations" and user status
    await deleteUserRecord(userUid);

    await deleteUser(firebaseAuth.currentUser);
  } catch (error) {
    console.warn(error);
    if (error instanceof FirebaseError) {
      return error;
    }
  }

  return null;
}

