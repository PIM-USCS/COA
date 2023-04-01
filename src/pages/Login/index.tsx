/* eslint-disable jsx-a11y/anchor-is-valid */
import "./styles.css";
import { NavLink } from "react-router-dom";
import Logo from "../../img/COA linha/COA/default_transparent_765x625 recortada.png";

export function Login() {
  return (
    <body className="login">
      {/* FORMULARIO */}
      <main className="main-login">
        {/* CABEÇALHO */}
        <header className="header-login">
          <h1>Login</h1>
        </header>
        {/*FIM CABEÇALO*/}
        {/*FORMULARIO*/}
        <section>
          <form className="form-login">
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
              <input
                id="password"
                type="password"
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
              <NavLink to="/Home" className="input-bnt-login">
                <button type="submit" className="bnt-login">
                  login
                </button>
              </NavLink>
              {/* </a> */}
            </div>
            {/* FIM BOTÃO LOGIN*/}
          </form>
        </section>
        {/* FIM FORMULARIO*/}
      </main>
      {/* FIM FORMULARIO  */}
    </body>
  );
}
