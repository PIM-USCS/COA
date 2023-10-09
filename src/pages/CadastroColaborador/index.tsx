import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { ColaboradorProps } from "../../@types/Colaborador";
import * as api from "../../services/api";
import Swal from "sweetalert2";
import { Eye, EyeSlash } from "phosphor-react";
import { UsuarioProps } from "../../@types/Usuario";
import maskTelefone from "../../utils/maskTelefone";

export function CadastroColaborador() {
  const [colaborador, setColaborador] = useState<ColaboradorProps>(
    {} as ColaboradorProps
  );
  const [usuario, setUsuario] = useState<UsuarioProps>({} as UsuarioProps);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [visualizarSenha, setVisualizarSenha] = useState(false);
  const [visualizarConfirmarSenha, setVisualizarConfirmarSenha] =
    useState(false);

  const desabilitarButtonCadastrar =
    usuario.email === "" || usuario.senha === "" || confirmarSenha === "";
  const navigate = useNavigate();

  const mascaraTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, valorFormatado } = maskTelefone(e);

    setColaborador({
      ...colaborador,
      [name]: valorFormatado,
    });
  };

  const validarEmailUsuario = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(usuario.email)) {
      Swal.fire({
        icon: "warning",
        title: "O email digitado é invalido!",
      });
    }
  };
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
    if (!usuario.tipo_usuario) {
      Swal.fire({
        icon: "warning",
        title: "Selecione o tipo de usuário!",
      });
      return;
    }
    if (usuario.senha !== confirmarSenha) {
      Swal.fire({
        icon: "warning",
        title: "As senhas não coincidem!",
      });
      return;
    }
    try {
      const responseColaborador = await api.postCreateColaborador(colaborador);
      const colaboradorId: string = responseColaborador.data.id;

      setColaborador({ ...colaborador, id: colaboradorId });

      await cadastrarUsuario(colaboradorId);
    } catch (error) {
      console.error(error);
    } finally {
      Swal.fire({
        icon: "success",
        title: "Cadastro concluído com sucesso!",
        preConfirm: () => {
          navigate(-1);
        },
      });
    }
  }

  async function cadastrarUsuario(colaboradorId: string) {
    try {
      const params = {
        ...usuario,
        id_colaborador: colaboradorId.toString(),
      };
      await api.postCreateUsuario(params);
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: "Não foi possivel cadastrar o usuário",
      });
    }
  }

  return (
    <div className="tela-colaborador-cadastrocolaborador">
      <main className="tela-colaborador-main-cadastrocolaborador">
        <header className="tela-colaborador-header-cadastrocolaborador">
          <h2>Cadastrar Colaborador</h2>
        </header>
        <section>
          <div className="tela-colaborador-floatingInput">
            <input
              type="text"
              className="tela-colaborador-floatingInput__control"
              placeholder="Nome"
              name="nome"
              value={colaborador.nome || ""}
              onChange={(e) =>
                setColaborador({
                  ...colaborador,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="tela-colaborador-floatingInput__label">
              Nome
            </label>
          </div>
          <div className="tela-colaborador-floatingInput">
            <input
              type="text"
              className="tela-colaborador-floatingInput__control"
              placeholder="Telefone"
              name="telefone"
              value={colaborador.telefone || ""}
              onChange={mascaraTelefone}
            />
            <label className="tela-colaborador-floatingInput__label">
              Telefone
            </label>
          </div>
          <section className="tela-colaborador-formulario-login-colaborador">
            <h2>Login</h2>
            <br />
            <hr />
            <br />

            <div className="tela-colaborador-tipo-usuario">
              <div className="tela-colaborador-div-tipo-usuario">
                <input
                  type="radio"
                  name="Administrador"
                  className="tela-colaborador-input-tipo-usuario"
                  value="1"
                  checked={usuario.tipo_usuario === "1"}
                  onChange={() => setUsuario({ ...usuario, tipo_usuario: "1" })}
                />
                <label
                  htmlFor="tipo-usuario"
                  className="tela-colaborador-label-tipo-usuario"
                >
                  Administrador
                </label>
              </div>
              <div className="tela-colaborador-div-tipo-usuario">
                <input
                  type="radio"
                  name="Colaborador"
                  className="tela-colaborador-input-tipo-usuario"
                  value="2"
                  checked={usuario.tipo_usuario === "2"}
                  onChange={() => setUsuario({ ...usuario, tipo_usuario: "2" })}
                />
                <label
                  htmlFor="tipo-usuario"
                  className="tela-colaborador-label-tipo-usuario"
                >
                  Colaborador
                </label>
              </div>
            </div>
            <div className="tela-colaborador-floatingInput">
              <input
                type="email"
                className="tela-colaborador-floatingInput__control"
                placeholder="E-mail"
                name="email"
                value={usuario.email || ""}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
                    [e.target.name]: e.target.value,
                  })
                }
                onBlur={validarEmailUsuario}
              />

              <label className="tela-colaborador-floatingInput__label">
                Email
              </label>
            </div>
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
                cadastrar
              </button>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
