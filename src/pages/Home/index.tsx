/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"; /* Modal*/
import "./styles.css";
import Logo from "../../img/logo sem fundo.png";
import { NavLink } from "react-router-dom";

import {
  Buildings,
  UserCircle,
  Lock,
  ArrowUDownLeft,
  PencilSimple,
  LockSimple,
  Files,
  ChartLineUp,
} from "phosphor-react";
import { UsuarioProps } from "../../@types/Usuario";
import { useUsuario } from "../../hooks/useUsuario";
import * as api from "../../services/api";
import { EnviarGuia } from "./Componentes/EnviarGuia";
import ImagemPadrao from "../../img/usuario padrao.png";
import { Header } from "../../Components/Header";

export function Home() {
  const [isOpenEnviar, setIsOpenEnviar] = useState(false); /*Modal*/
  const [usuarios, setUsuarios] = useState<UsuarioProps>({} as UsuarioProps);
  const { idUsuario, setIdUsuario } = useUsuario();

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
        avatar: data.avatar,
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
      <div className="tela-home-container-grid-home">
        <Header />
        <section className="tela-home-div-sidenav-home">
          <div className="tela-home-separador-home">
            <div
              className="tela-home-div-botoes"
              style={{
                display: usuarios.tipo_usuario !== "1" ? "none" : "flex",
              }}>
              <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
                <button className="tela-home-botao-secundario">
                  <ChartLineUp size={30} />
                  Dashboard
                </button>
              </NavLink>
            </div>
            <div
              className="tela-home-div-botoes"
              style={{
                display: usuarios.tipo_usuario !== "1" ? "none" : "flex",
              }}>
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
              }}>
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
                  Guias
                </button>
              </NavLink>
            </div>
            <div className="tela-home-div-botoes">
              <NavLink to="/tiposguia" style={{ textDecoration: "none" }}>
                <button className="tela-home-botao-secundario">
                  <Files size={30} />
                  Tipos de guias
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
      </div>
    </>
  );
}
