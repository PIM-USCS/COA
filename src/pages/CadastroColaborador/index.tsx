import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { ColaboradorProps } from "../../@types/Colaborador";
import * as api from "../../services/api";
import Swal from "sweetalert2";
import { Eye, EyeSlash } from "phosphor-react";
import { UsuarioProps } from "../../@types/Usuario";

export function CadastroColaborador() {
  const [colaborador, setColaborador] = useState<ColaboradorProps>(
    {} as ColaboradorProps
  );
  const [usuario, setUsuario] = useState<UsuarioProps>({} as UsuarioProps);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [visualizarSenha, setVisualizarSenha] = useState(false);
  const [visualizarConfirmarSenha, setVisualizarConfirmarSenha] =
    useState(false);

  const desabilitarButtonCadastrar =
    usuario.email === "" || usuario.senha === "" || confirmarSenha === "";
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
    try {
      await api.postCreateColaborador(colaborador);
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: "Não foi possivel cadastrar o colaborador",
      });
    }
  }

  async function CadastrarUsuario() {
    try {
      const params = {
        ...usuario,
        tipo_usuario: "1",
      };
      await api.postCreateUsuario(params);
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: "Não foi possivel cadastrar o usuário",
      });
    }
  }

  function Cadastrar() {
    if (usuario.senha !== confirmarSenha) {
      Swal.fire({
        icon: "error",
        title: "As senhas não coincidem!",
      });
      return;
    }

    CadastrarColaborador();
    CadastrarUsuario();
    Swal.fire({
      icon: "success",
      title: "Colaborador cadastrado com sucesso!",
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
              type="text"
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
            <label className="floatingInput__label">Telefone</label>
          </div>
          <section className="formulario-login-colaborador">
            <h2>Login</h2>
            <br />
            <hr />
            <br />
            <div className="floatingInput">
              <input
                type="email"
                className="floatingInput__control"
                placeholder="E-mail"
                name="email"
                value={usuario.email || ""}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
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
                value={usuario.senha || ""}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <label className="floatingInput__label">Senha</label>
            </div>
            <div className="floatingInput">
              <button
                className="esconder_senha"
                onClick={esconderSenhaConfirmar}>
                <EyeSlash
                  size={22}
                  style={{
                    display: visualizarConfirmarSenha ? "flex" : "none",
                  }}
                />
                <Eye
                  size={22}
                  style={{
                    display: visualizarConfirmarSenha ? "none" : "flex",
                  }}
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
                onClick={Cadastrar}
                disabled={desabilitarButtonCadastrar}>
                cadastrar
              </button>
            </div>
          </section>
        </section>
      </main>
    </body>
  );
}
