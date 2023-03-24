import React, { useState } from "react"; /*Modal */
import "./styles.css";
interface Open {
  isOpenEnviar: boolean;
  setIsOpenEnviar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EnviarGuia1({ isOpenEnviar, setIsOpenEnviar }: Open) {
  return (
    <div style={{ display: isOpenEnviar ? "flex" : "none" }}>
      <h1></h1>
    </div> /*Modal*/
  );
}
