import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useState } from "react";
import { ResetarSenha } from "../../@types/Usuario";
import { Eye, EyeSlash } from "phosphor-react";
import { useUsuario } from "../../hooks/useUsuario";
import * as api from "../../services/api";
import Swal from "sweetalert2";
export function TrocarSenha() {
  const { idUsuario } = useUsuario();
  const [usuario, setUsuario] = useState<ResetarSenha>({} as ResetarSenha);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [visualizarSenha, setVisualizarSenha] = useState(false);
  const [visualizarConfirmarSenha, setVisualizarConfirmarSenha] =
    useState(false);

  const desabilitarButtonCadastrar =
    usuario.email === "" || usuario.senha === "" || confirmarSenha === "";
  const navigate = useNavigate();

  function esconderSenha() {
    if (visualizarSenha === false) {
      setVisualizarSenha(true);
    }
    if (visualizarSenha === true) {
      setVisualizarSenha(false);
    }
  }
  function esconderSenhaConfirmar() {
    if (visualizarConfirmarSenha === false) {
      setVisualizarConfirmarSenha(true);
    }
    if (visualizarConfirmarSenha === true) {
      setVisualizarConfirmarSenha(false);
    }
  }

  async function finalizarCadastro() {
    if (idUsuario) {
      try {
        await api.putAtualizaUsuario(idUsuario, usuario);
        Swal.fire({
          icon: "success",
          title: "Senha alterada com sucesso!",
        });
      } catch (error) {
        console.log(error);
      } finally {
        navigate(-1);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Não foi possivel localizar o usuário",
      });
    }
  }
  return (
    <div className="tela-trocarsenha-trocarsenha">
      <main className="tela-trocarsenha-main-trocarsenha">
        <header className="tela-trocarsenha-header-trocarsenha">
          <h1>Alterar Senha</h1>
        </header>

        <section className="tela-trocarsenha-form-trocarsenha">
          <div className="tela-colaborador-floatingInput">
            <button
              className="tela-colaborador-esconder_senha"
              onClick={esconderSenha}
            >
              <EyeSlash
                size={22}
                style={{ display: visualizarSenha ? "flex" : "none" }}
              />
              <Eye
                size={22}
                style={{ display: visualizarSenha ? "none" : "flex" }}
              />
            </button>
            <input
              type={visualizarSenha ? "text" : "password"}
              className="tela-colaborador-floatingInput__control"
              placeholder="Senha"
              name="senha"
              value={usuario.senha || ""}
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="tela-colaborador-floatingInput__label">
              Senha
            </label>
          </div>
          <div className="tela-colaborador-floatingInput">
            <button
              className="tela-colaborador-esconder_senha"
              onClick={esconderSenhaConfirmar}
            >
              <EyeSlash
                size={22}
                style={{
                  display: visualizarConfirmarSenha ? "flex" : "none",
                }}
              />
              <Eye
                size={22}
                style={{
                  display: visualizarConfirmarSenha ? "none" : "flex",
                }}
              />
            </button>
            <input
              type={visualizarConfirmarSenha ? "text" : "password"}
              className="tela-colaborador-floatingInput__control"
              placeholder="Confirmar senha"
              name="senha"
              value={confirmarSenha || ""}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <label className="tela-colaborador-floatingInput__label">
              Confirmar senha
            </label>
          </div>
          <div>
            <button
              className={`tela-colaborador-bnt-cadastrocolaborador ${
                desabilitarButtonCadastrar ? "disabled" : ""
              }`}
              onClick={finalizarCadastro}
              disabled={desabilitarButtonCadastrar}
            >
              Alterar
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
