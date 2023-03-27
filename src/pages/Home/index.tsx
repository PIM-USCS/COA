import { useState } from "react"; /* Modal*/
// import { CadastroCliente1 } from "./Componentes/CadastroCliente1";
// import { EnviarGuia1 } from "./Componentes/EnviarGuia1";
import "./styles.css";
import Logo from "../../img/logo sem fundo.png";
import GuiBalbino from "../../img/GuiBalbinoFT.jpeg";
import {
  Gauge,
  FileText,
  CaretDown,
  CaretUp,
  ChartLineUp,
  ChartBar,
  File,
  FolderOpen,
} from "phosphor-react";

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
      <main className="container-grid-home">
        <header className="div-header-home">
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
        <section className="div-sidenav-home">
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
                  marginLeft: "64px",
                }}
              />
              <CaretUp
                size={16}
                weight="bold"
                style={{
                  display: isOpenPages ? "flex" : "none",
                  marginLeft: "64px",
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
        </section>
        <body className="div-content-home">
          <div className="div-guias">
            <div className="guias">
              <ChartLineUp size={48} weight="bold" />
              <div>
                <h3>Guias próximo mês</h3>
                <span>01</span>
              </div>
            </div>
            <div className="guias">
              <ChartBar size={48} weight="fill" />
              <div>
                <h3>Guias em aberto</h3>
                <span>01</span>
              </div>
            </div>
            <div className="guias">
              <File size={48} weight="fill" />
              <div>
                <h3>Guias em análise</h3>
                <span>01</span>
              </div>
            </div>

            <div className="guias">
              <FolderOpen size={48} weight="fill" />
              <div>
                <h3>Guias retornadas</h3>
                <span>01</span>
              </div>
            </div>
          </div>
          <table className="tabela">
            <thead>
              <tr className="head-tabela">
                <th scope="col">
                  <input className="" type="checkbox" />
                </th>
                <th scope="col">Código</th>
                <th scope="col">Cliente</th>
                <th scope="col">Valor</th>
                <th scope="col">Vencimento</th>
                <th scope="col">Mês Referente</th>
                <th scope="col">Estatus</th>
                <th scope="col">Detalhes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input className="" type="checkbox" />
                </td>
                <td>INV-0123</td>
                <td>Silas Roberto LTDA</td>
                <td>$123</td>
                <td>01 Jan 2045</td>
                <td>Nov 2022</td>
                <td>Regularizada</td>
                <td>
                  <a className="" href="">
                    Detail
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <input className="" type="checkbox" />
                </td>
                <td>INV-0123</td>
                <td>Guilherme Balbino LTDA</td>
                <td>$123</td>
                <td>01 Jan 2045</td>
                <td>Nov 2022</td>
                <td>Regularizada</td>
                <td>
                  <a className="" href="">
                    Detail
                  </a>
                </td>
              </tr>
              <td>
                <input className="" type="checkbox" />
              </td>
              <td>INV-0123</td>
              <td>Glauber Balsani EIRELI</td>
              <td>$123</td>
              <td>01 Jan 2045</td>
              <td>Nov 2022</td>
              <td>Regularizada</td>
              <td>
                <a className="" href="">
                  Detail
                </a>
              </td>
              <tr />

              <tr>
                <td>
                  <input className="" type="checkbox" />
                </td>
                <td>INV-0123</td>
                <td>Gustavo Akira S.A</td>
                <td>$123</td>
                <td>01 Jan 2045</td>
                <td>Nov 2022</td>
                <td>Regularizada</td>
                <td>
                  <a className="" href="">
                    Detail
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <input className="" type="checkbox" />
                </td>
                <td>INV-0123</td>
                <td>Lucas Aparecido S.A</td>
                <td>$123</td>
                <td>01 Jan 2045</td>
                <td>Nov 2022</td>
                <td>Regularizada</td>
                <td>
                  <a className="" href="">
                    Detail
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </main>
    </>
  );
}
