import "./styles.css";
import Logo from "../../img/COA linha/COA/favicon_1000x1000 recortada.png";

export function CadastroCliente() {
  return (
    <body className="cadcliente">
      <main className="main">
        <header className="header-cadcliente">
          <h1>Cadastro Cliente</h1>
          <img src={Logo} width="70rem" height="70rem" alt="" />
        </header>
        <form className="form-cadcliente">
          <section className="formulario">
            {/* Empresa */}
            <h2>Empresa</h2>
            {/* <!-- floatingInput --> */}
            {/* <!-- floatingInput__control --> */}
            {/* <!-- floatingInput__label --> */}
            <div className="floatingInput">
              <input
                type="text"
                id="razaosocial"
                className="floatingInput__control"
                placeholder="Razão social"
              />
              <label className="floatingInput__label">Razão social</label>
            </div>
            <div className="floatingInput">
              <input
                type="text"
                id="cnpj"
                className="floatingInput__control"
                placeholder="999.999.999/9999-99"
              />
              <label className="floatingInput__label">
                999.999.999/9999-99
              </label>
            </div>
            <div className="floatingInput">
              <input
                type="text"
                id="regime"
                className="floatingInput__control"
                placeholder="MEI/LUCRO REAL/LUCRO PRESUMIDO/"
              />
              <label className="floatingInput__label">
                MEI/LUCRO REAL/LUCRO PRESUMIDO/
              </label>
            </div>
          </section>
          <section className="formulario">
            {/*Login*/}
            <h2>Login</h2>
            <div className="floatingInput">
              <input
                type="text"
                id="nome"
                className="floatingInput__control"
                placeholder="nome"
              />
              <label className="floatingInput__label">Nome Usuario</label>
            </div>
            <div className="floatingInput">
              <input
                type="email"
                id="email"
                className="floatingInput__control"
                placeholder="Endereço de email"
              />
              <label className="floatingInput__label">Email de Login</label>
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
          </section>
          <section className="formulario">
            {/* Contato */}
            <h2>Contato</h2>
            <div className="floatingInput">
              <input
                type="text"
                id="email"
                className="floatingInput__control"
                placeholder="email"
              />
              <label className="floatingInput__label">E-Mail de contato</label>
            </div>
            <div className="floatingInput">
              <input
                id="text"
                type="nome"
                className="floatingInput__control"
                placeholder="nome"
              />
              <label className="floatingInput__label">Nome</label>
            </div>
            <div className="floatingInput">
              <input
                type="text"
                id="telefone"
                className="floatingInput__control"
                placeholder="telefone"
              />
              <label className="floatingInput__label">Telefone</label>
            </div>
            <div className="floatingInput">
              <input
                id="text"
                type="contador"
                className="floatingInput__control"
                placeholder="contador"
              />
              <label className="floatingInput__label">Contador</label>
            </div>
            <div className="floatingInput">
              <input
                id="text"
                type="Colaborador"
                className="floatingInput__control"
                placeholder="Colaborador"
              />
              <label className="floatingInput__label">Colaborador</label>
            </div>
          </section>
          <section className="formulario-btn">
            <div className="btn">
              <a href="">
                <button type="submit">Salvar</button>
              </a>
            </div>
          </section>
        </form>
      </main>
    </body>
  );
}
