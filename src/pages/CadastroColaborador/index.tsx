import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { ColaboradorProps } from "../../@types/Colaborador";
import * as api from "../../services/api";
import Swal from "sweetalert2";

export function CadastroColaborador() {
  const [colaborador, setColaborador] = useState<ColaboradorProps>(
    {} as ColaboradorProps
  );

  const navigate = useNavigate();

  function CadastrarColaborador() {
    api.postCreateColaborador(colaborador);
    Swal.fire({
      icon: "success",
      title: "Processo concluido!",
      text: "Colaborador cadastrado com sucesso!",
      confirmButtonText: "OK",
      preConfirm: () => {
        navigate(-1);
      },
    });
  }

  return (
    <body className="cadastrocolaborador">
      <main className="main-cadastrocolaborador">
        <header className="header-cadastrocolaborador">
          <h2>Cadastrar Colaborador</h2>
        </header>
        <section>
          <div className="floatingInput">
            <input
              type="text"
              /*id="nome-cadastrocolaborador"*/
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
              /*id="email-cadastrocolaborador"*/
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
          <div className="floatingInput">
            <input
              type="password"
              /*id="senha-cadastrocolaborador"*/
              className="floatingInput__control"
              placeholder="Senha"
              name="senha"
              value={colaborador.senha || ""}
              onChange={(e) =>
                setColaborador({
                  ...colaborador,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Senha</label>
          </div>
          <div>
            <button
              className="bnt-cadastrocolaborador"
              onClick={CadastrarColaborador}
            >
              cadastrar
            </button>
          </div>
        </section>
      </main>
    </body>
  );
}
