import { useContext } from "react";
import { EmpresaContext } from "../Context/EmpresaContext";

export function useEmpresa() {
  const context = useContext(EmpresaContext);
  return context;
}
