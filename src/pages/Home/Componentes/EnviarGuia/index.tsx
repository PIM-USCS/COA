import { UserCircle, XCircle } from "phosphor-react";
import React, { useState } from "react"; /*Modal */
import Swal from "sweetalert2"; /* Biblioteca da modal de alerta */

import { ClienteProps } from "../../../../@types/Client";
import * as api from "../../../../services/api";
import "./styles.css";

interface Open {
  isOpenEnviar: boolean;
  setIsOpenEnviar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EnviarGuia({ isOpenEnviar, setIsOpenEnviar }: Open) {
  const [cliente, setCliente] = useState<ClienteProps>({} as ClienteProps);

  const [valorPessoa, setvalorPessoa] = useState("");

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setvalorPessoa(value);
    console.log(`Valor selecionado: ${value}`);
  }

  async function ConsultaCliente() {
    if (valorPessoa === "PJ") {
      try {
        const { data } = await api.getClientByCNPJ(cliente.cnpj);
        setCliente((prevState) => {
          return {
            ...prevState,
            cnpj: data.cnpj,
            nome: data.nome,
          };
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "O CNPJ informado não está cadastrado",
        });
      }
    }
    if (valorPessoa === "PF") {
      try {
        const { data } = await api.getClientByCNPJ(cliente.cpf);
        setCliente((prevState) => {
          return {
            ...prevState,
            cpf: data.cpf,
            nome: data.nome,
          };
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "O CPF informado não está cadastrado",
        });
      }
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
            <select
              name="mySelect"
              id="mySelect"
              className="option-pessoa"
              value={valorPessoa}
              onChange={handleSelectChange}>
              <option value="PF">Pessoa Física</option>
              <option value="PJ">Pessoa Jurídica</option>
            </select>
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
