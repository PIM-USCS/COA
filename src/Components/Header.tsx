/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"; /* Modal*/

import Logo from "../img/logo sem fundo.png";
import { NavLink } from "react-router-dom";
import * as api from "../services/api";
import { Lock, PencilSimple } from "phosphor-react";
import { UsuarioProps } from "../@types/Usuario";
import { useUsuario } from "../hooks/useUsuario";
import ImagemPadrao from "../img/usuario padrao.png";

export function Header() {
  const [isOpenUser, setIisOpenUser] = useState(false);
  const [usuarios, setUsuarios] = useState<UsuarioProps>({} as UsuarioProps);
  const { idUsuario, setIdUsuario, setIdEmpresaUsuario } = useUsuario();
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
        avatar: data.avatar,
        id_empresa: data.id_empresa,
      };
    });
    if (data.id_empresa) {
      setIdEmpresaUsuario(data.id_empresa);
    } else {
      setIdEmpresaUsuario("");
    }
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
    <header className="tela-home-div-header-home">
      <div className="tela-home-div-header">
        <div className="tela-home-div-header-esquerda">
          <NavLink
            to="/home"
            style={{
              textDecoration: "none",
              all: "unset",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}>
            <button className="tela-home-botao-home">
              <img src={Logo} alt="Logo" />
              <h2>COA</h2>
            </button>
          </NavLink>
        </div>
        <div className="tela-home-div-header-direita">
          <button
            className="tela-home-botao-usuario"
            onClick={HabilitarSubMenuUser}>
            {usuarios.avatar ? (
              <img
                src={`http://localhost:3333/uploads/${usuarios.avatar}`}
                alt="Foto usuario"
              />
            ) : (
              <img src={ImagemPadrao} alt="Foto usuario" />
            )}

            <p className="tela-home-nome-usuario">{usuarios.nome}</p>
          </button>
          <div
            className="tela-home-submenu-usuario"
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
                Editar foto de perfil
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
