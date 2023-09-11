import { ArrowLeft, Buildings, WarningCircle } from "phosphor-react";
import { Cliente } from "./Componentes/Clientes";
import "./styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as api from "../../services/api";
import { ClienteProps } from "../../@types/Client";

export interface EmpresaListaProps {
  id: string;
  cpf: string;
  cnpj: string;
  nome: string;
}
export function EmpresaLista() {
  const [empresa, setEmpresa] = useState<EmpresaListaProps[]>([]);
  const [cliente] = useState<ClienteProps>({} as ClienteProps);
  const navigate = useNavigate();
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
        <button
          className="botao_return_empresa"
          onClick={() => navigate("/home")}>
          <ArrowLeft size={36} />
        </button>
        <h1>Listagem de empresas</h1>
      </header>

      <div className="div-cadastrar">
        <NavLink to="/cadastro-cliente" style={{ textDecoration: "none" }}>
          <button>
            <Buildings size={38} />
            Nova Empresa
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
        {empresa.length === 0 ? (
          <div className="informativo">
            <WarningCircle size={48} />
            <p>Nenhuma empresa cadastrada!</p>
          </div>
        ) : (
          empresa.map((empresa) => (
            <Cliente empresa={empresa} cliente={cliente} />
          ))
        )}
      </div>
    </body>
  );
}
