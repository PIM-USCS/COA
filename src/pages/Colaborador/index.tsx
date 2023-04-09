// import { UserCirclePlus } from "phosphor-react";
import { useEffect, useState } from "react";
import { ColaboradorListaProps } from "../../@types/Colaborador";
import { Colaborador } from "./Componentes/Colaborador";
import "./styles.css";

import { NavLink } from "react-router-dom";
import * as api from "../../services/api";

export function ColaboradorLista() {
  const [colaborador, setColaborador] = useState<ColaboradorListaProps[]>([]);

  const getColaborador = async () => {
    try {
      const { data } = await api.getColaborador();

      setColaborador(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getColaborador();
  }, []);

  return (
    <body className="container-geral-colaborador">
      <header className="container-titulo-colaborador">
        <h1>Listagem de colaborador</h1>
      </header>

      <div className="div-cadastrar-colaborador">
        <NavLink to="/cadastro-colaborador" style={{ textDecoration: "none" }}>
          <button>Novo Colaborador</button>
        </NavLink>
      </div>
      <div className="container-header-colaborador">
        <div className="div-id-colaborador">
          <p>ID</p>
        </div>
        <div className="div-nome-colaborador">
          <p>Nome</p>
        </div>
        <div className="div-pessoa-colaborador">
          <p>Email</p>
        </div>
        <div className="div-alterar-colaborador">
          <p>Alterar</p>
        </div>
        <div className="div-excluir-colaborador">
          <p>Excluir</p>
        </div>
        <div className="div-consultar-colaborador">
          <p>Consultar</p>
        </div>
      </div>
      <div className="container-lista-colaborador">
        {colaborador.map((colaborador) => (
          <Colaborador colaborador={colaborador} />
        ))}
      </div>
    </body>
  );
}
