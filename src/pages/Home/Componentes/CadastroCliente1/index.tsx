import React, { useState } from "react"; /*Modal */
import "./styles.css";
interface Open {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CadastroCliente1({ isOpen, setIsOpen }: Open) {
  return (
    <div style={{ display: isOpen ? "flex" : "none" }}>
      <h1></h1>
    </div>
  );
}
