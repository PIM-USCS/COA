import { useNavigate } from "react-router-dom";
import "./styles.css";

export function TrocarSenha() {
  const navigate = useNavigate();
  return (
    <body className="tela-trocarsenha-trocarsenha">
      <main className="tela-trocarsenha-main-trocarsenha">
        <header className="tela-trocarsenha-header-trocarsenha">
          <h1>Alterar Senha</h1>
        </header>
        <form>
          {/*  floatingInput  */}
          {/* floatingInput__control  */}
          {/*  floatingInput__label  */}
          <section className="tela-trocarsenha-form-trocarsenha">
            <div className="tela-trocarsenha-floatingInput">
              <input
                type="password"
                id="senhaantiga"
                className="tela-trocarsenha-floatingInput__control"
                placeholder="nome"
              />
              <label className="tela-trocarsenha-floatingInput__label">
                Senha Antiga
              </label>
            </div>
            <div className="tela-trocarsenha-floatingInput">
              <input
                type="password"
                id="senhanova"
                className="tela-trocarsenha-floatingInput__control"
                placeholder="Endereço de email"
              />
              <label className="tela-trocarsenha-floatingInput__label">
                Nova Senha
              </label>
            </div>
            <div className="tela-trocarsenha-floatingInput">
              <input
                type="password"
                id="senhanova1"
                className="tela-trocarsenha-floatingInput__control"
                placeholder="senha"
              />
              <label className="tela-trocarsenha-floatingInput__label">
                Confirmar Nova Senha
              </label>
            </div>
            <div className="tela-trocarsenha-">
              <button
                type="submit"
                className="tela-trocarsenha-bnt-trocarsenha"
              >
                Alterar
              </button>
              <button
                className="tela-trocarsenha-bnt-trocarsenha-abandonar"
                onClick={() => navigate("/home")}
              >
                abandonar alterações
              </button>
            </div>
          </section>
        </form>
      </main>
    </body>
  );
}
