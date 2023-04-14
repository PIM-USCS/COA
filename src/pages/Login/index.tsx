/* eslint-disable jsx-a11y/anchor-is-valid */
import "./styles.css";
import { NavLink } from "react-router-dom";
import Logo from "../../img/COA linha/COA/default_transparent_765x625 recortada.png";
import Swal from "sweetalert2";
import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";

export function Login() {
  // /*MODAL*/
  //   Swal.fire({
  //     icon:"error", /*icone*/
  //     title:"Falha no login",/*titulo*/
  //     text:"Usuario ou login incorreto",
  //     color:"gray",
  //     background:"black",
  //   })

  const [visualizarSenha, setVisualizarSenha] = useState(false);

  function esconderSenha() {
    if (visualizarSenha === false) {
      setVisualizarSenha(true);
    }
    if (visualizarSenha === true) {
      setVisualizarSenha(false);
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
            {/* <a href="Paginaprincipal.html"> Não é necessário, usar o NavLink*/}
            <NavLink
              to="/Home"
              className="input-bnt-login"
              style={{ textDecoration: "none" }}>
              <button type="submit" className="bnt-login">
                login
              </button>
            </NavLink>
            {/* </a> */}
          </div>
          {/* FIM BOTÃO LOGIN*/}
        </section>
      </main>
    </body>
  );
}
