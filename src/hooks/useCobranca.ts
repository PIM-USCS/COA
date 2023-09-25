import { useContext } from "react";
import { CobrancaContext } from "../Context/CobrancaContext";

export function useCobranca() {
  const context = useContext(CobrancaContext);
  return context;
}
