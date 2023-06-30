import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { ColaboradorProps } from "../../@types/Colaborador";
import * as api from "../../services/api";
import Swal from "sweetalert2";
import { Eye, EyeSlash } from "phosphor-react";

export function CadastroColaborador() {
  const [colaborador, setColaborador] = useState<ColaboradorProps>(
    {} as ColaboradorProps
  );
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [visualizarSenha, setVisualizarSenha] = useState(false);
  const [visualizarConfirmarSenha, setVisualizarConfirmarSenha] =
    useState(false);
  const desabilitarButtonCadastrar =
    colaborador.email === "" ||
    colaborador.senha === "" ||
    confirmarSenha === "";
  const navigate = useNavigate();
  //**Função para visualizar campos de senha
  function esconderSenha() {
    if (visualizarSenha === false) {
      setVisualizarSenha(true);
    }
    if (visualizarSenha === true) {
      setVisualizarSenha(false);
    }
  }
  function esconderSenhaConfirmar() {
    if (visualizarConfirmarSenha === false) {
      setVisualizarConfirmarSenha(true);
    }
    if (visualizarConfirmarSenha === true) {
      setVisualizarConfirmarSenha(false);
    }
  }
  //**Função para visualizar campos de senha

  async function CadastrarColaborador() {
    if (colaborador.senha !== confirmarSenha) {
      Swal.fire({
        icon: "error",
        title: "As senhas não coincidem!",
      });
      return;
    }

    try {
      await api.getColaboradorByEmail(colaborador.email);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Já existe um colaborador com este email!",
      });
    } catch (error) {
      await api.postCreateColaborador(colaborador);
      await api.postCreateUsuario(colaborador);
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
          <div className="floatingInput">
            <button className="esconder_senha" onClick={esconderSenha}>
              <EyeSlash
                size={22}
                style={{ display: visualizarSenha ? "flex" : "none" }}
              />
              <Eye
                size={22}
                style={{ display: visualizarSenha ? "none" : "flex" }}
              />
            </button>
            <input
              type={visualizarSenha ? "text" : "password"}
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
          <div className="floatingInput">
            <button className="esconder_senha" onClick={esconderSenhaConfirmar}>
              <EyeSlash
                size={22}
                style={{ display: visualizarConfirmarSenha ? "flex" : "none" }}
              />
              <Eye
                size={22}
                style={{ display: visualizarConfirmarSenha ? "none" : "flex" }}
              />
            </button>
            <input
              type={visualizarConfirmarSenha ? "text" : "password"}
              className="floatingInput__control"
              placeholder="Senha"
              name="senha"
              value={confirmarSenha || ""}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <label className="floatingInput__label">Confirmar senha</label>
          </div>
          <div>
            <button
              className={`bnt-cadastrocolaborador ${
                desabilitarButtonCadastrar ? "disabled" : ""
              }`}
              onClick={CadastrarColaborador}
              disabled={desabilitarButtonCadastrar}
            >
              cadastrar
            </button>
          </div>
        </section>
      </main>
    </body>
  );
}
