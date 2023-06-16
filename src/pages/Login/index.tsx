/* eslint-disable jsx-a11y/anchor-is-valid */
import "./styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../img/COA linha/COA/default_transparent_765x625 recortada.png";
import Swal from "sweetalert2";
import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import * as api from "../../services/api";
import { UsuarioProps } from "../../@types/Usuario";

export function Login() {
  const [visualizarSenha, setVisualizarSenha] = useState(false);
  const [usuario, setUsuario] = useState<UsuarioProps>({} as UsuarioProps);

  function esconderSenha() {
    if (visualizarSenha === false) {
      setVisualizarSenha(true);
    }
    if (visualizarSenha === true) {
      setVisualizarSenha(false);
    }
  }
  const navigate = useNavigate();
  const desabilitarLogin = usuario.email === "" || usuario.senha === "";
  async function login() {
    try {
      await api.checkLogin(usuario);
      navigate("/home");
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
        {/* FORMULARIO */}
        <header className="header-login">
          {/* CABEÇALHO */}
          <h1>Login</h1>
        </header>
        <section>
          {/*FORMULARIO*/}

          {/* Email */}
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
          {/* FIM Email */}
          {/* SENHA */}
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
          {/* FIM SENHA */}
          {/* CHECKBOX + LEMBRAR SENHA */}
          <div className="checkbox-esquecisenha-login">
            <div className="checkbox-login">
              <input type="checkbox" id="checkbox1" className="" />
              <label className="">Lembrar Usuario</label>
            </div>
            <NavLink to="/TrocarSenha" className="esquecisenha-login">
              <a>Esqueci minha senha</a>
            </NavLink>
          </div>
          {/* FIM CHECKBOX + LEMBRAR SENHA */}
          {/* BOTÃO LOGIN*/}
          <div>
            <button
              type="submit"
              className={`bnt-login ${desabilitarLogin ? "disabled" : ""}`}
              onClick={login}
              disabled={desabilitarLogin}>
              login
            </button>
          </div>
          {/* FIM BOTÃO LOGIN*/}
        </section>
      </main>
    </body>
  );
}
