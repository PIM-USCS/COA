import "./styles.css";
import { NavLink } from "react-router-dom";

export function CadastroColaborador() {
  return (
    <body className="cadastrocolaborador">
      <main className="main-cadastrocolaborador">
        <header className="header-cadastrocolaborador">
          <h2>Cadastrar Colaborador</h2>
        </header>
        <section>
          <form className="form-cadastrocolaborador">
            <div className="floatingInput">
              <input
                type="text"
                /*id="nome-cadastrocolaborador"*/
                className="floatingInput__control"
                placeholder="Nome"
              />
              <label className="floatingInput__label">Nome</label>
            </div>
            <div className="floatingInput">
              <input
                type="email"
                /*id="email-cadastrocolaborador"*/
                className="floatingInput__control"
                placeholder="E-mail"
              />
              <label className="floatingInput__label">Email</label>
            </div>
            <div className="floatingInput">
              <input
                type="password"
                /*id="senha-cadastrocolaborador"*/
                className="floatingInput__control"
                placeholder="Senha"
              />
              <label className="floatingInput__label">Senha</label>
            </div>
            <div>
              <NavLink
                to="/Home"
                className="input-bnt-cadastrocolaborador"
                style={{ textDecoration: "none" }}>
                <button type="submit" className="bnt-cadastrocolaborador">
                  Salvar
                </button>
              </NavLink>
            </div>
          </form>
        </section>
      </main>
    </body>
  );
}
