/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { useColaborador } from "../../hooks/useColaborador";
import * as api from "../../services/api";

interface ColaboradorProps {
  nome: string;
  email: string;
  senha: string;
}

export function ConsultaColaborador() {
  const { idColaborador } = useColaborador();
  const [colaborador, setColaborador] = useState<ColaboradorProps>(
    {} as ColaboradorProps
  );
  const ConsultaColaborador = async () => {
    if (!idColaborador) {
      return;
    }
    const { data } = await api.getColaboradorByID(idColaborador);

    setColaborador({
      ...colaborador,
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    });
  };
  useEffect(() => {
    ConsultaColaborador();
  }, [idColaborador]);
  return (
    <body className="alterarcadastrocolaborador">
      <main className="main-alterarcadastrocolaborador">
        <header className="header-alterarcadastrocolaborador">
          <h2 className="h2-alterarcadastrocolaborador">
            Consulta Colaborador
          </h2>
        </header>
        <section>
          <form className="form-alterarcadastrocolaborador">
            <div className="floatingInput">
              <input
                type="text"
                /*id="nome-cadastrocolaborador"*/
                className="floatingInput__control"
                placeholder="Nome"
                value={colaborador.nome || ""}
                readOnly
              />
              <label className="floatingInput__label">Nome</label>
            </div>
            <div className="floatingInput">
              <input
                type="email"
                /*id="email-cadastrocolaborador"*/
                className="floatingInput__control"
                placeholder="E-mail"
                value={colaborador.email || ""}
                readOnly
              />
              <label className="floatingInput__label">Email</label>
            </div>
            <div>
              <NavLink
                to="/Colaborador"
                className="input-bnt-cadastrocolaborador"
                style={{ textDecoration: "none" }}>
                <button type="submit" className="bnt-cadastrocolaborador">
                  Voltar
                </button>
              </NavLink>
            </div>
          </form>
        </section>
      </main>
    </body>
  );
}
