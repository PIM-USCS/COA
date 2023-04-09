import { useState } from "react"; /* Modal*/
import "./styles.css";
import Logo from "../../img/logo sem fundo.png";
import { NavLink } from "react-router-dom";
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
import { EnviarGuia } from "./Componentes/EnviarGuia";
import { Guias } from "./Componentes/Guias";

export function Home() {
  const [isOpenEnviar, setIsOpenEnviar] = useState(false); /*Modal*/
  const [isOpenPages, setIsOpenPages] = useState(false);

  function HabilitarSubPaginas() {
    if (isOpenPages === false) {
      setIsOpenPages(true);
    } else {
      setIsOpenPages(false);
    }
  }
  console.log(isOpenEnviar);
  return (
    <>
      <EnviarGuia
        isOpenEnviar={isOpenEnviar}
        setIsOpenEnviar={setIsOpenEnviar}
      />
      <body className="container-grid-home">
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
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}
              >
                Deslogar
              </button>
            </NavLink>
            <NavLink
              to="/cadastro-colaborador"
              style={{ textDecoration: "none" }}
            >
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}
              >
                Cadastrar colaborador
              </button>
            </NavLink>
            <NavLink
              to="/alterar-cadastro-colaborador"
              style={{ textDecoration: "none" }}
            >
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}
              >
                Alterar cadastro colaborador
              </button>
            </NavLink>
            <NavLink to="/clientes" style={{ textDecoration: "none" }}>
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}
              >
                Clientes
              </button>
            </NavLink>
            <NavLink to="/colaborador" style={{ textDecoration: "none" }}>
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}
              >
                Colaborador
              </button>
            </NavLink>
            
            <NavLink
              to="/alterar-cadastro-cliente"
              style={{ textDecoration: "none" }}
            >
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}
              >
                Alterar cadastro cliente
              </button>
            </NavLink>
            <NavLink to="/trocar-senha" style={{ textDecoration: "none" }}>
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}
              >
                Alterar senha
              </button>
            </NavLink>
            <button
              onClick={() => setIsOpenEnviar(true)}
              className="botao-secundario"
              style={{ display: isOpenPages ? "flex" : "none" }}
            >
              Enviar guias
            </button>
            <button
              className="botao-secundario"
              style={{ display: isOpenPages ? "flex" : "none" }}
            >
              Finanças
            </button>
          </div>
        </section>
        <article className="div-content-home">
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
        </article>
      </body>
    </>
  );
}
