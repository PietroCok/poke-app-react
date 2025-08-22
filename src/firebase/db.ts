import { get, getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import type { User } from "firebase/auth";

import type { Cart, Poke, UserProfile } from "@/types";
import { firebaseApp } from "./index";


const firebaseDatabase = getDatabase(firebaseApp);

console.log('Firebase Database Initialized!');

const createUserRecord = async (user: User): Promise<UserProfile | null> => {
  // Check if user already exists
  if (!user.email || !user.uid) {
    console.warn('Unable to create user record: missing email or uid!');
    return null;
  }

  const userRecord: Pick<UserProfile, 'email' | 'status' | 'createdAt'> = {
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
    uid: user.uid
  }

  return profile;
}


export const deleteUserRecord = async (userUid: string) => {
  try {
    // remove all carts for the user
    const allCarts = await getCarts(userUid) || [];
    for(const cart of allCarts) {
      if(cart.createdBy === userUid){
        await deleteCart(cart.id);
      } else {
        await removeCartUser(cart.id, userUid);
      }
    }
    // removed the actual user record
    await remove(ref(firebaseDatabase, `/users/${userUid}`));
    return true;
  } catch (error) {
    console.warn(error);
  }

  return false;
}

type FirebaseDbUser = {
  [key: string]: UserProfile
}

export const getUserProfile = async (user: User): Promise<UserProfile | null> => {
  try {
    const snapshot = await get(ref(firebaseDatabase, `/users/${user.uid}`));
    if (snapshot.exists()) {
      const { email, role, status, createdAt } = snapshot.val();
      return {
        email,
        role,
        status,
        createdAt,
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

export const createCart = async (cart: Cart): Promise<boolean> => {
  // Update multiple parts in a single "transaction"
  const updates: any = {};
  updates[`/shared-carts/cart-${cart.id}`] = cart;
  updates[`/users/${cart.createdBy}/carts/cart-${cart.id}/`] = true;

  try {
    await update(ref(firebaseDatabase), updates);
    return true;
  } catch (error) {
    console.warn(error);
  }

  return false;
}

export const getCart = async (cartId: string): Promise<Cart | null> => {
  try {
    const snapshot = await get(ref(firebaseDatabase, `/shared-carts/cart-${cartId}/`));
    if (snapshot.exists()) return snapshot.val();
  } catch (error) {
    console.warn(error);
  }
  return null;
}

export const getCarts = async (userUid: string): Promise<Cart[] | null> => {
  // Read the list of carts id
  let cartIds = {};
  try {
    const snapshot = await get(ref(firebaseDatabase, `users/${userUid}/carts/`));
    if (snapshot.exists()) {
      cartIds = snapshot.val();
    }
  } catch (error) {
    return null;
  }

  // Retrieve carts from ids
  const carts = [];
  for (const cartId in cartIds) {
    try {
      const snapshot = await get(ref(firebaseDatabase, `shared-carts/${cartId}/`));
      if (snapshot.exists()) {
        carts.push(snapshot.val());
      } else {
        // If a cart is not found remove it from the list of carts
        removeCartUser(cartId, userUid);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  return carts;
}

export const addCartUser = async (cartId: string, userUid: string): Promise<boolean> => {
  // Add cart id to user cart list
  try {
    await update(ref(firebaseDatabase, `/users/${userUid}/carts/`), {
      [`cart-${cartId}`]: true
    })
    return true;
  } catch (error) {
    console.warn(error);
  }
  return false;
}

export const removeCartUser = async (cartId: string, userUid: string): Promise<boolean> => {
  const fixedCartId = cartId.startsWith('cart-') ? cartId : `cart-${cartId}`;
  try {
    await remove(ref(firebaseDatabase, `/users/${userUid}/carts/${fixedCartId}`));
    console.log('Removed cart access', cartId);
    return true;
  } catch (error) {
    console.warn(error);
  }
  return false;
}

export const hasCartUser = async (cartId: string, userUid: string): Promise<boolean> => {
  try {
    const snapshot = await get(ref(firebaseDatabase, `users/${userUid}/carts/cart-${cartId}`));
    if (snapshot.exists()) {
      return !!snapshot.val();
    }
  } catch (error) {
    console.warn(error);
  }
  return false;
}

export const addCartItem = async (cartId: string, item: Poke): Promise<boolean> => {
  try {
    await set(ref(firebaseDatabase, `/shared-carts/cart-${cartId}/items/${item.id}`), item);
    return true;
  } catch (error) {
    console.warn(error);
  }
  return false;
}

export const replaceCartItem = async (cartId: string, item: Poke, oldItemId: string) => {
  try {
    const updates: any = {};
    updates[`shared-carts/cart-${cartId}/items/${item.id}`] = item;
    updates[`shared-carts/cart-${cartId}/items/${oldItemId}`] = null;
    await update(ref(firebaseDatabase), updates);
    return true;
  } catch (error) {
    console.warn(error);
  }
  return false;
}

export const removeAllCartItems = async (cartId: string) => {
  try {
    await set(ref(firebaseDatabase, `/shared-carts/cart-${cartId}/items`), {})
    return true;
  } catch (error) {
    console.warn(error);
    return false
  }
}

export const removeCartItem = async (cartId: string, itemId: string): Promise<boolean> => {
  try {
    await remove(ref(firebaseDatabase, `/shared-carts/cart-${cartId}/items/${itemId}`),);
    return true;
  } catch (error) {
    console.warn(error);
  }
  return false;
}

export const deleteCart = async (cartId: string): Promise<boolean> => {
  try {
    await remove(ref(firebaseDatabase, `/shared-carts/cart-${cartId}`));
    return true;
  } catch (error) {
    console.warn(error);
  }
  return false;
}


export const observeCart = (cartId: string, callback: (cart: Cart | null) => void) => {
  const unsubscribe = onValue(ref(firebaseDatabase, `/shared-carts/cart-${cartId}`), (snapshot) => {

    if (!snapshot.exists()) {
      callback(null);
      return;
    };

    const cart = snapshot.val();
    if (!cart) {
      callback(null);
      return;
    };

    callback(cart);
  },
    (error) => console.warn(error)
  )
  return unsubscribe;
}


