import { useContext } from "react";
import { UsuarioContext } from "../Context/UsuarioContext";

export function useUsuario() {
  const context = useContext(UsuarioContext);
  return context;
}
