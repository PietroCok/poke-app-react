import type { Poke } from "@/types";
import { useAuth } from "../../context/AuthContext";

export interface ItemProps {
  item: Poke
}

export function Item({ item }: ItemProps) {
  const { user } = useAuth();

  return (
    <div>
      {item.name}
    </div>
  )
}
