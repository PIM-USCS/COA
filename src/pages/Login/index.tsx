/* eslint-disable jsx-a11y/anchor-is-valid */
import "./styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import * as api from "../../services/api";
import { UsuarioProps } from "../../@types/Usuario";
import { useUsuario } from "../../hooks/useUsuario";

export function Login() {
  const [visualizarSenha, setVisualizarSenha] = useState(false);
  const [usuario, setUsuario] = useState<UsuarioProps>({} as UsuarioProps);
  const { idUsuario, setIdUsuario } = useUsuario();
  function esconderSenha() {
    if (visualizarSenha === false) {
      setVisualizarSenha(true);
    }
    if (visualizarSenha === true) {
      setVisualizarSenha(false);
    }
  }
  const navigate = useNavigate();

  const desabilitarLogin = !usuario.email || !usuario.senha;
  async function login() {
    try {
      const { data } = await api.checkLogin(usuario);
      navigate("/home");

      if (!data.user?.id) {
        return;
      }
      setIdUsuario(data.user?.id);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Email/Senha está incorreto!",
      });
    }
  }

  return (
    <body className="tela-login-login">
      <main className="tela-login-main-login">
        <header className="tela-login-header-login">
          <h1>Login</h1>
        </header>
        <section>
          <div className="tela-login-floatingInput">
            <input
              type="email"
              id="login"
              className="tela-login-floatingInput__control"
              placeholder="login"
              name="email"
              value={usuario.email || ""}
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="tela-login-floatingInput__label">Login</label>
          </div>
          <div className="tela-login-floatingInput">
            <button
              className="tela-login-esconder_senha"
              onClick={esconderSenha}>
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
              className="tela-login-floatingInput__control"
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

            <label className="tela-login-floatingInput__label">Senha</label>
          </div>
          <div className="tela-login-checkbox-esquecisenha-login">
            <div className="tela-login-checkbox-login">
              <input type="checkbox" id="checkbox1" className="tela-login-" />
              <label className="tela-login-">Lembrar Usuario</label>
            </div>
            <NavLink
              to="/recuperar-senha"
              className="tela-login-esquecisenha-login">
              <a>Esqueci minha senha</a>
            </NavLink>
          </div>
          <div>
            <button
              type="submit"
              className={`tela-login-bnt-login ${
                desabilitarLogin ? "disabled" : ""
              }`}
              onClick={login}
              disabled={desabilitarLogin}>
              login
            </button>
          </div>
        </section>
      </main>
    </body>
  );
}
