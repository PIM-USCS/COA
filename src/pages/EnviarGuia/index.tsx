import "./styles.css";

export function EnviarGuia() {
  return (
    <body className="enviarguias">
      <main className="main">
        <header className="header-enviarguias">
          <h1 className="formulario">Enviar Guias</h1>
          <img
            src="../img/COA linha/COA/favicon_1000x1000 recortada.png"
            width="70rem"
            height="70rem"
            alt=""
          />
        </header>
        <form>
          {/*  floatingInput */}
          {/*  floatingInput__control */}
          {/*  floatingInput__label  */}
          <div className="floatingInput">
            <input
              type="text"
              id="codigoempresa"
              className="floatingInput__control"
              placeholder="codigoempresa"
            />
            <label className="floatingInput__label">Codigo Empresa</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              id="razaosocial"
              className="floatingInput__control"
              placeholder="razaosocial"
            />
            <label className="floatingInput__label">Razão Social</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              id="cnpj"
              className="floatingInput__control"
              placeholder="cnpj"
            />
            <label className="floatingInput__label">CNPJ</label>
          </div>
          {/* arquivo */}
          <div className="floatingInput">
            <input type="file" id="arquivo" className="arquivo" />
            <div className="floatingInput">
              <textarea
                placeholder="Observação"
                className="floatingInput__control"
                id="floatingtext"></textarea>
              <label className="floatingInput__label">Observação</label>
            </div>
          </div>
          <div>
            <a href="">
              <button type="submit">Enviar</button>
            </a>
          </div>
        </form>
      </main>
    </body>
  );
}
