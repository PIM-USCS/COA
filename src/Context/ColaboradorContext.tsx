import React, { createContext, ReactNode, useState } from "react";

interface ColaboradorContextType {
  idColaborador: string;
  setIdColaborador: React.Dispatch<React.SetStateAction<string>>;
}

interface ColaboradorContextProviderProps {
  children: ReactNode;
}

export const ColaboradorContext = createContext({} as ColaboradorContextType);

export function ColaboradorContextProvider({
  children,
}: ColaboradorContextProviderProps) {
  const [idColaborador, setIdColaborador] = useState("");

  return (
    <ColaboradorContext.Provider value={{ idColaborador, setIdColaborador }}>
      {children}
    </ColaboradorContext.Provider>
  );
}
