/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"; /* Modal*/
import "./styles.css";
import Logo from "../../img/logo sem fundo.png";
import { NavLink } from "react-router-dom";
import GuiBalbino from "../../img/GuiBalbinoFT.jpeg";
import {
  Buildings,
  UserCircle,
  Lock,
  Export,
  ArrowUDownLeft,
  PencilSimple,
  LockSimple,
  Files,
} from "phosphor-react";
import { UsuarioProps } from "../../@types/Usuario";
import { useUsuario } from "../../hooks/useUsuario";
import * as api from "../../services/api";
import { EnviarGuia } from "./Componentes/EnviarGuia";

export function Home() {
  const [isOpenEnviar, setIsOpenEnviar] = useState(false); /*Modal*/
  const [isOpenUser, setIisOpenUser] = useState(false);
  const [usuarios, setUsuarios] = useState<UsuarioProps>({} as UsuarioProps);
  const { idUsuario, setIdUsuario } = useUsuario();

  function HabilitarSubMenuUser() {
    if (isOpenUser === false) {
      setIisOpenUser(true);
    } else {
      setIisOpenUser(false);
    }
  }

  const ConsultaUsuario = async () => {
    if (!idUsuario) {
      return;
    }
    const { data } = await api.getUsuarioById(idUsuario);

    setUsuarios((prevState) => {
      return {
        ...prevState,
        nome: data.email,
        tipo_usuario: data.tipo_usuario,
      };
    });
  };

  useEffect(() => {
    ConsultaUsuario();
  }, [idUsuario]);

  useEffect(() => {
    const storedIdUsuario = localStorage.getItem("idUsuario");
    if (storedIdUsuario) {
      setIdUsuario(storedIdUsuario);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("idUsuario", idUsuario);
  }, [idUsuario]);

  return (
    <>
      <EnviarGuia
        isOpenEnviar={isOpenEnviar}
        setIsOpenEnviar={setIsOpenEnviar}
      />
      <body className="tela-home-container-grid-home">
        <header className="tela-home-div-header-home">
          <div className="tela-home-div-header">
            <div className="tela-home-div-header-esquerda">
              <button className="tela-home-botao-home">
                <img src={Logo} alt="Logo" />
                <h2>COA</h2>
              </button>
            </div>
            <div className="tela-home-div-header-direita">
              <button
                className="tela-home-botao-usuario"
                onClick={HabilitarSubMenuUser}
              >
                <img src={GuiBalbino} alt="Foto usuario" />
                <p className="tela-home-nome-usuario">{usuarios.nome}</p>
              </button>
              <div
                className="tela-home-submenu-usuario"
                style={{
                  display: isOpenUser ? "flex" : "none",
                }}
              >
                <NavLink
                  to="/alterar-usuario"
                  style={{
                    textDecoration: "none",
                    all: "unset",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
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
                  }}
                >
                  <button>
                    <Lock size={18} />
                    Alterar senha
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </header>
        <section className="tela-home-div-sidenav-home">
          <div className="tela-home-separador-home">
            <div
              className="tela-home-div-botoes"
              style={{
                display: usuarios.tipo_usuario !== "1" ? "none" : "flex",
              }}
            >
              <NavLink to="/empresas" style={{ textDecoration: "none" }}>
                <button className="tela-home-botao-secundario">
                  <Buildings size={30} />
                  Empresas
                </button>
              </NavLink>
            </div>
            <div
              className="tela-home-div-botoes"
              style={{
                display: usuarios.tipo_usuario !== "1" ? "none" : "flex",
              }}
            >
              <NavLink to="/colaborador" style={{ textDecoration: "none" }}>
                <button className="tela-home-botao-secundario">
                  <UserCircle size={30} />
                  Colaboradores
                </button>
              </NavLink>
            </div>
            <div className="tela-home-div-botoes">
              <NavLink to="/cobrancas" style={{ textDecoration: "none" }}>
                <button className="tela-home-botao-secundario">
                  <Files size={30} />
                  Cobranças
                </button>
              </NavLink>
            </div>
            <div className="tela-home-div-botoes">
              <NavLink to="/trocar-senha" style={{ textDecoration: "none" }}>
                <button className="tela-home-botao-secundario">
                  <LockSimple size={30} />
                  Trocar Senha
                </button>
              </NavLink>
            </div>
            <div className="tela-home-div-botoes">
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <button className="tela-home-botao-secundario">
                  <ArrowUDownLeft size={30} />
                  Deslogar
                </button>
              </NavLink>
            </div>
          </div>
        </section>
      </body>
    </>
  );
}
