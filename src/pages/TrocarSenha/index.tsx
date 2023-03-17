import "./styles.css";

export function TrocarSenha() {
  return (
    <body className="trocarsenha">
      <main className="main">
        <header className="header-trocarsenha">
          <h1>Alterar Senha</h1>
          <img
            src="../img/COA linha/COA/favicon_1000x1000 recortada.png"
            width="70rem"
            height="70rem"
            alt=""
          />
        </header>
        <form>
          {/*  floatingInput  */}
          {/* floatingInput__control  */}
          {/*  floatingInput__label  */}
          <section className="form-trocarsenha">
            <div className="floatingInput">
              <input
                type="password"
                id="senhaantiga"
                className="floatingInput__control"
                placeholder="nome"
              />
              <label className="floatingInput__label">Senha Antiga</label>
            </div>
            <div className="floatingInput">
              <input
                type="password"
                id="senhanova"
                className="floatingInput__control"
                placeholder="Endereço de email"
              />
              <label className="floatingInput__label">Nova Senha</label>
            </div>
            <div className="floatingInput">
              <input
                type="password"
                id="senhanova1"
                className="floatingInput__control"
                placeholder="senha"
              />
              <label className="floatingInput__label">
                Confirmar Nova Senha
              </label>
            </div>
            <div className="btn">
              <a href="">
                <button type="submit" className="btn">
                  Salvar
                </button>
              </a>
            </div>
          </section>
        </form>
      </main>
    </body>
  );
}
