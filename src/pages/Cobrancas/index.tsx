import { useEffect, useState } from "react";

import "./styles.css";

import { NavLink, useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import { ArrowLeft, IdentificationCard, WarningCircle } from "phosphor-react";
import { Cobranca } from "./Componentes/Cobranca";
import { CobrancaProps } from "../../@types/Cobranca";

export function CobrancaLista() {
  const [cobranca, setCobranca] = useState<CobrancaProps[]>([]);
  const navigate = useNavigate();

  const getCobranca = async () => {
    try {
      const { data } = await api.getCobrancas();

      setCobranca(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCobranca();
  }, []);

  return (
    <main className="container-geral-cobranca">
      <header className="container-titulo-cobranca">
        <button
          className="botao_return_cobranca"
          onClick={() => navigate("/home")}>
          <ArrowLeft size={36} />
        </button>
        <h1>Listagem de cobrancas</h1>
      </header>

      <div className="div-cadastrar-cobranca">
        <NavLink to="/cadastro-cobranca" style={{ textDecoration: "none" }}>
          <button>
            <IdentificationCard size={32} weight="fill" />
            Novo Cobranca
          </button>
        </NavLink>
      </div>
      <div className="container-header-cobranca">
        <div className="div-id-cobranca">
          <p>ID</p>
        </div>
        <div className="div-vencimento-cobranca">
          <p>Vencimento</p>
        </div>
        <div className="div-valor-cobranca">
          <p>Valor</p>
        </div>
        <div className="div-status-cobranca">
          <p>Status</p>
        </div>
        <div className="div-alterar-cobranca">
          <p>Alterar</p>
        </div>
        <div className="div-excluir-cobranca">
          <p>Excluir</p>
        </div>
        <div className="div-consultar-cobranca">
          <p>Consultar</p>
        </div>
      </div>
      <div className="container-lista-cobranca">
        {cobranca.length === 0 ? (
          <div className="informativo">
            <WarningCircle size={48} />
            <p>Nenhuma cobrança cadastrada!</p>
          </div>
        ) : (
          cobranca.map((cobranca) => (
            <Cobranca key={cobranca.id} cobranca={cobranca} />
          ))
        )}
      </div>
    </main>
  );
}
