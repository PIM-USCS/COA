/* eslint-disable react-hooks/exhaustive-deps */
import { useColaborador } from "../../hooks/useColaborador";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import { useEffect, useState } from "react";

interface ColaboradorProps {
  nome: string;
  email: string;
  senha: string;
}
export function AlterarCadastroColaborador() {
  const { idColaborador } = useColaborador();
  const [colaborador, setColaborador] = useState<ColaboradorProps>(
    {} as ColaboradorProps
  );
  const navigate = useNavigate();

  const ConsultaColaborador = async () => {
    if (!idColaborador) {
      return;
    }
    const { data } = await api.getColaboradorByID(idColaborador);

    setColaborador({
      ...colaborador,
      nome: data.nome,
      email: data.email,
    });
  };
  useEffect(() => {
    ConsultaColaborador();
  }, [idColaborador]);

  async function confirmarCadastro() {
    await api.postAtualizaColaborador(idColaborador, {
      nome: colaborador.nome.toString(),
      email: colaborador.email.toString(),
    });
    navigate("/Home");
  }

  return (
    <body className="alterarcadastrocolaborador">
      <main className="main-alterarcadastrocolaborador">
        <header className="header-alterarcadastrocolaborador">
          <h2 className="h2-alterarcadastrocolaborador">
            Alterar Dados Colaborador
          </h2>
        </header>
        <section>
          <div className="form-alterarcadastrocolaborador">
            <div className="floatingInput">
              <input
                type="text"
                className="floatingInput__control"
                placeholder="Nome"
                name="nome"
                value={colaborador.nome || ""}
                onChange={(e) =>
                  setColaborador({
                    ...colaborador,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <label className="floatingInput__label">Nome</label>
            </div>
            <div className="floatingInput">
              <input
                type="email"
                className="floatingInput__control"
                placeholder="E-mail"
                name="email"
                value={colaborador.email || ""}
                onChange={(e) =>
                  setColaborador({
                    ...colaborador,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <label className="floatingInput__label">Email</label>
            </div>
            <div>
              <button
                className="bnt-cadastrocolaborador"
                onClick={confirmarCadastro}>
                Alterar
              </button>
              <button
                className="bnt-cadastrocolaborador-abandonar"
                onClick={() => navigate(-1)}>
                abandonar alterações
              </button>
            </div>
          </div>
        </section>
      </main>
    </body>
  );
}
