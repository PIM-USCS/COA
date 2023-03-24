import { useState } from "react"; /* Modal*/
// import { CadastroCliente1 } from "./Componentes/CadastroCliente1";
// import { EnviarGuia1 } from "./Componentes/EnviarGuia1";
import "./styles.css";
import Logo from "../../img/logo sem fundo.png";
import GuiBalbino from "../../img/GuiBalbinoFT.jpeg";
import { Gauge, FileText, CaretDown, CaretUp } from "phosphor-react";

// import { ChartLineUp } from "phosphor-react";
// <ChartLineUp size={32} weight="bold" />

export function Home() {
  // const [isOpen, setIsOpen] = useState(false); /*Modal*/
  // const [isOpenEnviar, setIsOpenEnviar] = useState(false); /*Modal*/

  const [isOpenPages, setIsOpenPages] = useState(false);

  function HabilitarSubPaginas() {
    if (isOpenPages === false) {
      setIsOpenPages(true);
    } else {
      setIsOpenPages(false);
    }
  }
  return (
    <>
      <main>
        <header>
          <div className="div-header">
            <div className="div-header-esquerda">
              <button className="botao-home">
                <img src={Logo} alt="Logo" />
                <h2>COA</h2>
              </button>
            </div>
            <div className="div-header-direita">
              <button className="botao-usuario">
                <img src={GuiBalbino} alt="Foto usuario" />
                <p>Guilherme Balbino</p>
              </button>
            </div>
          </div>
        </header>
        <body>
          <div className="barra-lateral">
            <div className="usuario-barra-lateral">
              <img src={GuiBalbino} alt="Foto usuario" />
              <div>
                <p>Guilherme Balbino</p>
                <span>Administrador</span>
              </div>
            </div>
            <div className="div-botoes">
              <button className="botao-dashboard">
                <Gauge size={32} weight="fill" />
                Dashboard
              </button>
              <button className="botao-pages" onClick={HabilitarSubPaginas}>
                <FileText size={32} weight="fill" />
                Pages
                <CaretDown
                  size={16}
                  weight="bold"
                  style={{
                    display: isOpenPages ? "none" : "flex",
                    marginLeft: "48px",
                  }}
                />
                <CaretUp
                  size={16}
                  weight="bold"
                  style={{
                    display: isOpenPages ? "flex" : "none",
                    marginLeft: "48px",
                  }}
                />
              </button>

              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}>
                Deslogar
              </button>
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}>
                Cadastrar colaborador
              </button>
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}>
                Cadastrar cliente
              </button>
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}>
                Alterar senha
              </button>
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}>
                Enviar guias
              </button>
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}>
                Finanças
              </button>
            </div>
          </div>

          <div className="div-guias">
            <div className="guias">
              <h3>Guias próximo mês</h3>
            </div>
            <div className="guias">
              <h3>Guias em aberto</h3>
            </div>
            <div className="guias">
              <h3>Guias em análise</h3>
            </div>
            <div className="guias">
              <h3>Guias retornadas</h3>
            </div>
          </div>
        </body>
      </main>
    </>
  );
}
