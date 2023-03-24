import { useState } from "react"; /* Modal*/
// import { CadastroCliente1 } from "./Componentes/CadastroCliente1";
// import { EnviarGuia1 } from "./Componentes/EnviarGuia1";
import "./styles.css";
import Logo from "../../img/logo sem fundo.png";
import GuiBalbino from "../../img/GuiBalbinoFT.jpeg";
import { Gauge, FileText } from "phosphor-react";

// import { ChartLineUp } from "phosphor-react";
// <ChartLineUp size={32} weight="bold" />

export function Home() {
  // const [isOpen, setIsOpen] = useState(false); /*Modal*/
  // const [isOpenEnviar, setIsOpenEnviar] = useState(false); /*Modal*/

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
              <button className="botao-pages">
                <FileText size={32} weight="fill" />
                Pages
              </button>
            </div>
          </div>
        </body>
      </main>
    </>
  );
}
