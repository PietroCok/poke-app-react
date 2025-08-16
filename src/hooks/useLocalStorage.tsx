import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  storageKey: string, 
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storageValue = localStorage.getItem(storageKey);
    try {
      return storageValue != null ? JSON.parse(storageValue) as T : initialValue;
    } catch (error) {
      return initialValue;      
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value])

  return [value, setValue];
}