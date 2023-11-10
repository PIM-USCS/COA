import React, { createContext, ReactNode, useState } from "react";

interface CobrancaContextType {
  idCobranca: string;
  setIdCobranca: React.Dispatch<React.SetStateAction<string>>;
  idTipoguia: string;
  setIdTipoguia: React.Dispatch<React.SetStateAction<string>>;
}

interface CobrancaContextProviderProps {
  children: ReactNode;
}

export const CobrancaContext = createContext({} as CobrancaContextType);

export function CobrancaContextProvider({
  children,
}: CobrancaContextProviderProps) {
  const [idCobranca, setIdCobranca] = useState("");
  const [idTipoguia, setIdTipoguia] = useState("");

  return (
    <CobrancaContext.Provider
      value={{ idCobranca, setIdCobranca, idTipoguia, setIdTipoguia }}>
      {children}
    </CobrancaContext.Provider>
  );
}
