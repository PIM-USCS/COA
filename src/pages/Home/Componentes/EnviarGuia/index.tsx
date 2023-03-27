import { UserCircle, XCircle } from "phosphor-react";
import React, { useState } from "react"; /*Modal */
import "./styles.css";
interface Open {
  isOpenEnviar: boolean;
  setIsOpenEnviar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EnviarGuia({ isOpenEnviar, setIsOpenEnviar }: Open) {
  return (
    <div
      style={{ display: isOpenEnviar ? "flex" : "none" }}
      className="container-enviar-guia">
      <div className="enviar-guia">
        <div className="fechar-modal">
          <button onClick={() => setIsOpenEnviar(false)}>
            <XCircle size={32} />
          </button>
        </div>
        <header>
          <div className="div-header-enviar-guia">
            <UserCircle size={48} />
            <h1>Enviar Guias</h1>
          </div>
        </header>
        <div>
          <div className="div-body-enviar-guia">
            <input
              type="text"
              placeholder="CNPJ/CPF"
              className="input-cnpj-cpf"
            />
            <input
              type="text"
              placeholder="Cliente"
              className="input-cliente"
            />
            <input type="file" name="arquivo" className="input-enviar-guia" />
            <button className="enviar-guia-botao">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
