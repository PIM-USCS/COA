import { UserCircle, XCircle } from "phosphor-react";
import React, { useState } from "react";
import Swal from "sweetalert2"; /* Biblioteca da modal de alerta */

import { EmpresaProps } from "../../../../@types/Client";
import * as api from "../../../../services/api";
import "./styles.css";

interface Open {
  isOpenEnviar: boolean;
  setIsOpenEnviar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EnviarGuia({ isOpenEnviar, setIsOpenEnviar }: Open) {
  const [cliente, setCliente] = useState<EmpresaProps>({} as EmpresaProps);

  async function ConsultaCliente() {
    try {
      const { data } = await api.getEmpresaByID(cliente.id);
      setCliente((prevState) => {
        return {
          ...prevState,
          cpf: data.cpf,
          cnpj: data.cnpj,
          nome: data.nome,
        };
      });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Não foi possivel localizar o cliente com o ID informado",
      });
    }
  }

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
              placeholder="ID"
              className="input-id-cliente"
              value={cliente.id}
              name="id"
              onChange={(e) =>
                setCliente({
                  ...cliente,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="CNPJ/CPF"
              className="input-cnpj-cpf"
              name="cpnj-cpf"
              value={cliente.cpf || cliente.cnpj}
              onChange={(e) =>
                setCliente({
                  ...cliente,
                  [e.target.name]: e.target.value,
                })
              }
              onBlur={ConsultaCliente}
            />
            <input
              type="text"
              placeholder="Cliente"
              className="input-cliente"
              value={cliente.nome}
              name="nome"
              onChange={(e) =>
                setCliente({
                  ...cliente,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input type="file" name="arquivo" className="input-enviar-guia" />
            <button className="enviar-guia-botao">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
