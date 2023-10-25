import React, { createContext, ReactNode, useState } from "react";

interface UsuarioContextType {
  idUsuario: string;
  setIdUsuario: React.Dispatch<React.SetStateAction<string>>;
  idEmpresaUsuario: string;
  setIdEmpresaUsuario: React.Dispatch<React.SetStateAction<string>>;
}

interface UsuarioContextProviderProps {
  children: ReactNode;
}

export const UsuarioContext = createContext({} as UsuarioContextType);

export function UsuarioContextProvider({
  children,
}: UsuarioContextProviderProps) {
  const [idUsuario, setIdUsuario] = useState("");
  const [idEmpresaUsuario, setIdEmpresaUsuario] = useState(
    localStorage.getItem("idEmpresaUsuario") || ""
  );

  return (
    <UsuarioContext.Provider
      value={{ idUsuario, setIdUsuario, idEmpresaUsuario, setIdEmpresaUsuario }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
