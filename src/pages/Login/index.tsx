/* eslint-disable jsx-a11y/anchor-is-valid */
import "./styles.css";
import { NavLink } from "react-router-dom";
import Logo from "../../img/COA linha/COA/default_transparent_765x625 recortada.png";

export function Login() {
  return (
    <body className="login">    
      {/* FORMULARIO */}
      <main className="main-login">
        <header className="header-login">
          <h1>Login</h1>
        </header>
        <section>
          <form className="form-login">
            <div className="floatingInput">
              <input
                type="email"
                id="login"
                className="floatingInput__control"
                placeholder="login"
              />
              <label className="floatingInput__label">Login</label>
            </div>
            <div className="floatingInput">
              <input
                id="password"
                type="password"
                className="floatingInput__control"
                placeholder="senha"
              />
              <label className="floatingInput__label">Senha</label>
            </div>
            <div className="form-btn">
              {/* <a href="Paginaprincipal.html"> Não é necessário, usar o NavLink*/}
              <NavLink to="/Home">
                <button type="submit" className="btn">
                  login
                </button>
              </NavLink>
              {/* </a> */}
            </div>
          </form>
          <div className="checkbox">
            <div className="checkbox1">
              <input type="checkbox" id="checkbox1" className="" />
              <label className="">Lembrar Usuario</label>
            </div>
            <NavLink
              to="/TrocarSenha"
              style={{ textDecoration: "none", color: "black" }}>
              <a className="esquecisenha">Esqueci minha senha</a>
            </NavLink>
          </div>
        </section>
      </main>
      {/* FIM FORMULARIO  */}
    </body>
  );
}
