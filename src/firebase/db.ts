import { get, getDatabase, ref, set } from "firebase/database";
import type { User } from "firebase/auth";

import type { UserProfile } from "@/types";
import { firebaseApp } from "./index";


const firebaseDatabase = getDatabase(firebaseApp);

console.log('Firebase Database Initialized!');

const createUserRecord = async (user: User): Promise<UserProfile | null> => {
  // Check if user already exists
  if (!user.email || !user.uid) {
    console.warn('Unable to create user record: missing email or uid!');
    return null;
  }

  const userRecord = {
    email: user.email,
    status: 'pending',
    createdAt: new Date().toISOString()
  }

  // Create user record
  try {
    await set(ref(firebaseDatabase, `/users/${user.uid}`), userRecord);
  } catch (error) {
    console.warn(error);
    return null;
  }

  console.log(`User record created on db`);
  const profile = {
    ...userRecord,
    role: 'basic',
    carts: []
  }

  return profile;
}

export const getUserProfile = async (user: User): Promise<UserProfile | null> => {

  // Simulate longer loading time
  // await new Promise(resolve => setTimeout(resolve, 2000));

  try {
    const snapshot = await get(ref(firebaseDatabase, `/users/${user.uid}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return await createUserRecord(user);
    }
  } catch (error) {
    console.warn(error);
    return null;
  }
}
