import { useEffect, useReducer, useState } from "react";

export function useLocalStorage<T>(
  storageKey: string, 
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => loadFromLocalStorage(storageKey, initialValue));

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value])

  return [value, setValue];
}

export function useLocalStorageReducer<T, A>(
  storageKey: string,
  reducer: (state: T, action: A) => T,
  initialValue: T
): [T, React.Dispatch<A>] {
  const [value, dispatch] = useReducer(reducer, initialValue, () => loadFromLocalStorage(storageKey, initialValue));

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value])

  return [value, dispatch];
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T) {
  const storageValue = localStorage.getItem(key);
  try {
    return storageValue != null ? (JSON.parse(storageValue) as T) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}