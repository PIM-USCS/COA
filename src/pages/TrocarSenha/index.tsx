import { useNavigate } from "react-router-dom";
import "./styles.css";


export function TrocarSenha() {

  const navigate = useNavigate();
  return (
    <body className="trocarsenha">
      <main className="main-trocarsenha">
        <header className="header-trocarsenha">
          <h1>Alterar Senha</h1>

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
            <div className="">
              <button type="submit" className="bnt-trocarsenha">
                Alterar
              </button>
              <button
                className="bnt-trocarsenha-abandonar"
                onClick={() => navigate("/home")}>
                abandonar alterações
              </button>
            </div>
          </section>
        </form>
      </main>
    </body>
  );
}
