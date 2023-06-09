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
  console.log(idUsuario);
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
        icon: "error",
        title: "Oops...",
        text: "Email/Senha está incorreto!",
      });
    }
  }

  return (
    <body className="login">
      <main className="main-login">
        <header className="header-login">
          <h1>Login</h1>
        </header>
        <section>
          <div className="floatingInput">
            <input
              type="email"
              id="login"
              className="floatingInput__control"
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
            <label className="floatingInput__label">Login</label>
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
              id="password"
              type={visualizarSenha ? "text" : "password"}
              className="floatingInput__control"
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

            <label className="floatingInput__label">Senha</label>
          </div>
          <div className="checkbox-esquecisenha-login">
            <div className="checkbox-login">
              <input type="checkbox" id="checkbox1" className="" />
              <label className="">Lembrar Usuario</label>
            </div>
            <NavLink to="/TrocarSenha" className="esquecisenha-login">
              <a>Esqueci minha senha</a>
            </NavLink>
          </div>
          <div>
            <button
              type="submit"
              className={`bnt-login ${desabilitarLogin ? "disabled" : ""}`}
              onClick={login}
              disabled={desabilitarLogin}
            >
              login
            </button>
          </div>
        </section>
      </main>
    </body>
  );
}
