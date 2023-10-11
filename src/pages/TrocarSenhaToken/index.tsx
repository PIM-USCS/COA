import { useNavigate } from "react-router-dom";
import "./styles.css";
import * as api from "../../services/api";
import { useState } from "react";
import { UsuarioProps } from "../../@types/Usuario";
import Swal from "sweetalert2";
import { Eye, EyeSlash } from "phosphor-react";

export function TrocarSenhaToken() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<UsuarioProps>({} as UsuarioProps);
  const [visualizarSenha, setVisualizarSenha] = useState(false);
  const [visualizarConfirmarSenha, setVisualizarConfirmarSenha] =
    useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");

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

  async function recuperarSenha() {
    if (!usuario.token) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Token não informado corretamente",
      });
      return;
    }
    try {
      await api.putRecuperarSenha(usuario.token, {
        senha: usuario.senha,
      });

      Swal.fire({
        icon: "success",
        title: "Senha redefinida com sucesso!",
      });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Ocorreu algum erro para redefinir a senha",
      });
    }
  }
  return (
    <body className="tela-trocarsenha-token-trocarsenhatoken">
      <main className="tela-trocarsenha-token-main-trocarsenhatoken">
        <header className="tela-trocarsenha-token-header-trocarsenhatoken">
          <h1>Recuperar Senha</h1>
        </header>

        <section className="tela-trocarsenha-token-form-trocarsenhatoken">
          <div className="tela-trocarsenha-token-floatingInput">
            <input
              type="text"
              className="tela-trocarsenha-token-floatingInput__control"
              placeholder="nome"
              name="token"
              value={usuario.token || ""}
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="tela-trocarsenha-token-floatingInput__label">
              Token enviado por email
            </label>
          </div>
          <div className="tela-trocarsenha-token-floatingInput">
            <button
              className="tela-trocarsenha-token-esconder_senha"
              onClick={esconderSenha}
            >
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
              id="password"
              type={visualizarSenha ? "text" : "password"}
              className="tela-trocarsenha-token-floatingInput__control"
              placeholder="senha"
              name="senha"
              value={usuario.senha || ""}
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  [e.target.name]: e.target.value,
                })
              }
            />

            <label className="tela-trocarsenha-token-floatingInput__label">
              Senha
            </label>
          </div>
          <div className="tela-trocarsenha-token-floatingInput">
            <button
              className="tela-trocarsenha-token-esconder_senha"
              onClick={esconderSenhaConfirmar}
            >
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
              className="tela-trocarsenha-token-floatingInput__control"
              placeholder="Senha"
              name="senha"
              value={confirmarSenha || ""}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <label className="tela-trocarsenha-token-floatingInput__label">
              Confirmar senha
            </label>
          </div>
          <div className="tela-trocarsenha-token-">
            <button
              type="submit"
              className="tela-trocarsenha-token-bnt-trocarsenhatoken"
              onClick={recuperarSenha}
            >
              Alterar
            </button>
          </div>
        </section>
      </main>
    </body>
  );
}
