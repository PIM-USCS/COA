import React, { createContext, ReactNode, useState } from "react";

interface EmpresaContextType {
  idEmpresa: string;
  setIdEmpresa: React.Dispatch<React.SetStateAction<string>>;
  idCliente: string;
  setIdCliente: React.Dispatch<React.SetStateAction<string>>;
}

interface EmpresaContextProviderProps {
  children: ReactNode;
}

export const EmpresaContext = createContext({} as EmpresaContextType);

export function EmpresaContextProvider({
  children,
}: EmpresaContextProviderProps) {
  const [idEmpresa, setIdEmpresa] = useState("");
  const [idCliente, setIdCliente] = useState("");

  return (
    <EmpresaContext.Provider
      value={{ idEmpresa, setIdEmpresa, idCliente, setIdCliente }}>
      {children}
    </EmpresaContext.Provider>
  );
}
