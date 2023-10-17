import { useNavigate } from "react-router-dom";
import "./styles.css";
import * as api from "../../services/api";
import { UsuarioProps } from "../../@types/Usuario";
import { useState } from "react";
import Swal from "sweetalert2";
import LoadingIcon from "../../Components/Loading";

export function RecuperarSenha() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<UsuarioProps>({} as UsuarioProps);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function enviarEmail() {
    try {
      setIsLoading(true);
      const params = { ...usuario };
      await api.postRecuperarSenha(params);
      Swal.fire({
        icon: "success",
        title: "Email de recuperação enviado com sucesso!",
        text: "Siga as instruções do email para recuperar sua senha",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Não foi possivel enviar o email de recuperação!",
        text: "Tente novamente mais tarde",
      });
    } finally {
      setIsLoading(false);
      navigate("/resetar-senha");
    }
  }

  return (
    <>
      <LoadingIcon isLoading={isLoading} />
      <div className="tela-recuperar-senha-recuperarsenha">
        <main className="tela-recuperar-senha-main-recuperarsenha">
          <header className="tela-recuperar-senha-header-recuperarsenha">
            <h1>Recuperar Senha</h1>
          </header>

          <section className="tela-recuperar-senha-form-recuperarsenha">
            <div className="tela-recuperar-senha-floatingInput">
              <input
                type="text"
                id="senhanova"
                className="tela-recuperar-senha-floatingInput__control"
                placeholder="Endereço de email"
                name="email"
                value={usuario.email || ""}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <label className="tela-recuperar-senha-floatingInput__label">
                Seu email
              </label>
            </div>
            <div className="tela-recuperar-senha-">
              <button
                className="tela-recuperar-senha-bnt-recuperarsenha"
                onClick={enviarEmail}
              >
                Enviar email
              </button>
              <button
                className="tela-recuperar-senha-bnt-recuperarsenha-abandonar"
                onClick={() => navigate("/")}
              >
                voltar
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
