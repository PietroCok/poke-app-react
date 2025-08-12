import { get, getDatabase, ref, set, update } from "firebase/database";
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
    carts: [],
    uid: user.uid
  }

  return profile;
}

type FirebaseDbUser = {
  [key: string]: UserProfile
}

export const getUserProfile = async (user: User): Promise<UserProfile | null> => {
  try {
    const snapshot = await get(ref(firebaseDatabase, `/users/${user.uid}`));
    if (snapshot.exists()) {
      return {
        ...snapshot.val(),
        uid: user.uid
      }
    } else {
      return await createUserRecord(user);
    }
  } catch (error) {
    console.warn(error);
    return null;
  }
}


export const getUsers = async (): Promise<UserProfile[] | []> => {
  try {
    const snapshot = await get(ref(firebaseDatabase, `/users`));
    if (snapshot.exists()) {
      const users: FirebaseDbUser = snapshot.val();

      const parsedUsers = [];
      for (const [uid, user] of Object.entries(users)) {
        parsedUsers.push({
          ...user,
          uid: uid
        })
      }
      return parsedUsers;
    } else {
      return [];
    }
  } catch (error) {
    console.warn(error);
    return [];
  }
}


export const updateUserStatus = async (userUid: string, newStatus: string) => {
  if (!userUid || !newStatus) {
    console.warn(`updateUserStatus: One or more invalid parameters`)
    return false;
  }

  try {
    await update(ref(firebaseDatabase, `/users/${userUid}`), {
      status: newStatus
    });

    return true;
  } catch (error) {
    console.warn(error);
    return false;  
  }
}