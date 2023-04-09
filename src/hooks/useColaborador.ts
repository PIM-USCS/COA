import { useContext } from "react";
import { ColaboradorContext } from "../Context/ColaboradorContext";

export function useColaborador() {
  const context = useContext(ColaboradorContext);
  return context;
}
