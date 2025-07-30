import { createContext, useContext, useState } from "react";

import appConfig from '../../../config.json';

const defaultSize = Object.keys(appConfig?.dimensioni)[0] ?? '';
const SizeContext = createContext(null);

export const useSize = () => {
  const ctx = useContext(SizeContext);
  if (!ctx) throw new Error('useSize must be used within a SizeProvider');
  return ctx;
};

export default function SizeProvider({ children }) {
  const [size, setSize] = useState(defaultSize);

  const selectSize = (newSelectedSize) => {
    if (size != newSelectedSize) {
      setSize(newSelectedSize);
    }
  }

  return (
    <SizeContext.Provider value={{ size, selectSize }}>
      {children}
    </SizeContext.Provider>
  );
}