import { createContext, useContext } from "react";
import { Outlet } from "react-router-dom";

import type { PaymentMethod, SelectionContextType } from "@/types";
import { PAYMENT_METHODS } from "@/types";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MenuSelectionProvider } from "./MenuSelectionContext";
import { PokeSelectionProvider } from "./PokeSelectionContext";

const SelectionContext = createContext<SelectionContextType | null>(null);

export const useSelection = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be used within a SelectionProvider');

  return ctx;
};

export function SelectionProvider() {
  const [paymentMethod, setPaymentMethod] = useLocalStorage<PaymentMethod>('poke-payment-method', PAYMENT_METHODS.CASH);
  const [name, setName] = useLocalStorage('poke-save-name', '');

  return (
    <SelectionContext.Provider value={{
      name,
      paymentMethod,
      setName,
      setPaymentMethod,
    }}>
      <MenuSelectionProvider>
        <PokeSelectionProvider>
          <Outlet />
        </PokeSelectionProvider>
      </MenuSelectionProvider>
    </SelectionContext.Provider>
  );
}

