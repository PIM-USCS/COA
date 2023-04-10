import { UserCirclePlus } from "phosphor-react";
import { Cliente } from "./Componentes/Clientes";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import * as api from "../../services/api";
import { useEmpresa } from "../../hooks/useEmpresa";

export interface EmpresaListaProps {
  id: string;
  cpf: string;
  cnpj: string;
  nome: string;
  tipo_cliente: string;
}
export function EmpresaLista() {
  const [empresa, setEmpresa] = useState<EmpresaListaProps[]>([]);

  const getEmpresa = async () => {
    try {
      const { data } = await api.getEmpresa();

      setEmpresa(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmpresa();
  }, []);

  return (
    <body className="container-geral">
      <header className="container-titulo">
        <h1>Listagem de empresas</h1>
      </header>

      <div className="div-cadastrar">
        <NavLink to="/cadastro-cliente" style={{ textDecoration: "none" }}>
          <button>
            <UserCirclePlus size={38} />
            Novo Cliente
          </button>
        </NavLink>
      </div>
      <div className="container-header">
        <div className="div-id">
          <p>ID</p>
        </div>
        <div className="div-nome">
          <p>Nome</p>
        </div>
        <div className="div-pessoa">
          <p>Tipo pessoa</p>
        </div>
        <div className="div-cnpj-cpf">
          <p>CNPJ/CPF</p>
        </div>
        <div className="div-alterar">
          <p>Alterar</p>
        </div>
        <div className="div-excluir">
          <p>Excluir</p>
        </div>
        <div className="div-consultar">
          <p>Consultar</p>
        </div>
      </div>
      <div className="container-lista">
        {empresa.map((empresa) => (
          <Cliente empresa={empresa} />
        ))}
      </div>
    </body>
  );
}
