/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"; /* Modal*/
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
  Buildings,
  UserCircle,
  Lock,
  Export,
  ArrowUDownLeft,
  PencilSimple,
  List,
} from "phosphor-react";
import { EnviarGuia } from "./Componentes/EnviarGuia";
import { UsuarioProps } from "../../@types/Usuario";
import { useUsuario } from "../../hooks/useUsuario";
import * as api from "../../services/api";

export function Home() {
  const [isOpenEnviar, setIsOpenEnviar] = useState(false); /*Modal*/
  const [isOpenPages, setIsOpenPages] = useState(false);
  const [isOpenUser, setIisOpenUser] = useState(false);
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const [usuarios, setUsuarios] = useState<UsuarioProps>({} as UsuarioProps);
  const { idUsuario } = useUsuario();

  function HabilitarSubPaginas() {
    if (isOpenPages === false) {
      setIsOpenPages(true);
    } else {
      setIsOpenPages(false);
    }
  }

  function HabilitarSubMenuUser() {
    if (isOpenUser === false) {
      setIisOpenUser(true);
    } else {
      setIisOpenUser(false);
    }
  }
  function HabilitarSideBar() {
    setIsOpenSideBar(!isOpenSideBar);
  }
  const ConsultaUsuario = async () => {
    if (!idUsuario) {
      return;
    }
    const { data } = await api.getUsuarioById(idUsuario);
    setUsuarios((prevState) => {
      return {
        ...prevState,
        nome: data.nome,
      };
    });
  };
  useEffect(() => {
    ConsultaUsuario();
  }, [idUsuario]);
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
              {/* { <button onClick={HabilitarSideBar} className="botao-sidebar">
                <List size={32} />
              </button> } */}
            </div>
            <div className="div-header-direita">
              <button className="botao-usuario" onClick={HabilitarSubMenuUser}>
                <img src={GuiBalbino} alt="Foto usuario" />
                <p>{usuarios.nome}</p>
              </button>
              <div
                className="submenu-usuario"
                style={{
                  display: isOpenUser ? "flex" : "none",
                }}>
                <NavLink
                  to="/alterar-usuario"
                  style={{
                    textDecoration: "none",
                    all: "unset",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}>
                  <button>
                    <PencilSimple size={18} />
                    Editar perfil
                  </button>
                </NavLink>
                <NavLink
                  to="/"
                  style={{
                    textDecoration: "none",
                    all: "unset",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}>
                  <button>
                    <Lock size={18} />
                    Alterar senha
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </header>

        <section className={`div-sidenav-home ${isOpenSideBar ? "" : "hide"}`}>
          {/* Comentado apenas para teste visual <div className="usuario-barra-lateral">
            <img src={GuiBalbino} alt="Foto usuario" />
            <div>
              <p>Guilherme Balbino</p>
              <span>Administrador</span>
            </div>
          </div> Comentado apenas para teste visual*/}
          <div className="div-botoes">
            <button className="botao-dashboard">
              <Gauge size={32} weight="fill" />
              <p>Dashboard</p>
            </button>
            <button className="botao-pages" onClick={HabilitarSubPaginas}>
              <FileText size={32} weight="fill" />
               <p>Páginas</p>  
              <CaretDown
                size={16}
                weight="bold"
                style={{
                  display: isOpenPages ? "none" : "flex",
                  marginLeft: "12px",
                }}
              />
              <CaretUp
                size={16}
                weight="bold"
                style={{
                  display: isOpenPages ? "flex" : "none",
                  marginLeft: "12px",
                }}
              />
            </button>

            <NavLink to="/empresas" style={{ textDecoration: "none" }}>
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}>
                <Buildings size={24} />
                Empresas
              </button>
            </NavLink>
            <NavLink to="/colaborador" style={{ textDecoration: "none" }}>
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}>
                <UserCircle size={24} />
                Colaborador
              </button>
            </NavLink>

            <button
              onClick={() => setIsOpenEnviar(true)}
              className="botao-secundario"
              style={{ display: isOpenPages ? "flex" : "none" }}>
              <Export size={24} />
              Enviar guias
            </button>
            <button
              className="botao-secundario"
              style={{ display: isOpenPages ? "flex" : "none" }}>
              <ChartBar size={24} />
              Finanças
            </button>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <button
                className="botao-secundario"
                style={{ display: isOpenPages ? "flex" : "none" }}>
                <ArrowUDownLeft size={24} />
                Deslogar
              </button>
            </NavLink>
          </div>
        </section>
        {/* <article className="div-content-home">
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
        </article> */}
      </body>
    </>
  );
}
