/* eslint-disable react-hooks/exhaustive-deps */
import { useColaborador } from "../../hooks/useColaborador";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface ColaboradorProps {
  nome: string;
  telefone: string;
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
      telefone: data.telefone,
    });
  };

  async function confirmarCadastro() {
    await api.postAtualizaColaborador(idColaborador, {
      nome: colaborador.nome.toString(),
      telefone: colaborador.telefone.toString(),
    });
    Swal.fire({
      icon: "success",
      title: "Cadastro atualizado com sucesso!",
      preConfirm: () => {
        navigate(-1);
      },
    });
  }

  useEffect(() => {
    ConsultaColaborador();
  }, []);
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
                type="telefone"
                className="floatingInput__control"
                placeholder="Telefone"
                name="telefone"
                value={colaborador.telefone || ""}
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
                className="bnt-page-cadastrocolaborador"
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
