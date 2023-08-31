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
} from "phosphor-react";
import { EnviarGuia } from "./Componentes/EnviarGuia";
import { UsuarioProps } from "../../@types/Usuario";
import { useUsuario } from "../../hooks/useUsuario";
import * as api from "../../services/api";

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

  //Função que faz carregar o nome do usuario
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
  //Função que faz carregar o nome do usuario

  //Armazena o ID do usuario para consulta do nome toda vez que a pagina recarrega
  useEffect(() => {
    const storedIdUsuario = localStorage.getItem("idUsuario");
    if (storedIdUsuario) {
      setIdUsuario(storedIdUsuario);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("idUsuario", idUsuario);
  }, [idUsuario]);
  //Armazena o ID do usuario para consulta do nome toda vez que a pagina recarrega

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
              <button className="botao-usuario" onClick={HabilitarSubMenuUser}>
                <img src={GuiBalbino} alt="Foto usuario" />
                <p className="nome-usuario">{usuarios.nome}</p>
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
        <section className="div-sidenav-home">
          <div className="separador-home">
            <div className="div-botoes">
              <NavLink to="/empresas" style={{ textDecoration: "none" }}>
                <button className="botao-secundario">
                  <Buildings size={30} />
                  Empresas
                </button>
              </NavLink>
            </div>
            <div className="div-botoes">
              <NavLink to="/colaborador" style={{ textDecoration: "none" }}>
                <button className="botao-secundario">
                  <UserCircle size={30} />
                  Colaboradores
                </button>
              </NavLink>
            </div>
            <div className="div-botoes">
              <button
                onClick={() => setIsOpenEnviar(true)}
                className="botao-secundario">
                <Export size={30} />
                Enviar guias
              </button>
            </div>
            <div className="div-botoes">
              <NavLink to="/trocar-senha" style={{ textDecoration: "none" }}>
                <button className="botao-secundario">
                  <LockSimple size={30} />
                  Trocar Senha
                </button>
              </NavLink>
            </div>
            <div className="div-botoes">
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <button className="botao-secundario">
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
