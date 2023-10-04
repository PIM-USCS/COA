import { useNavigate } from "react-router-dom";
import "./styles.css";
import * as api from "../../services/api";
import { UsuarioProps } from "../../@types/Usuario";
import { useState } from "react";
import Swal from "sweetalert2";

export function RecuperarSenha() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<UsuarioProps>({} as UsuarioProps);

  async function enviarEmail() {
    try {
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
      navigate("/resetar-senha");
    }
  }

  return (
    <body className="recuperarsenha">
      <main className="main-recuperarsenha">
        <header className="header-recuperarsenha">
          <h1>Recuperar Senha</h1>
        </header>

        <section className="form-recuperarsenha">
          <div className="floatingInput">
            <input
              type="text"
              id="senhanova"
              className="floatingInput__control"
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
            <label className="floatingInput__label">Seu email</label>
          </div>
          <div className="">
            <button className="bnt-recuperarsenha" onClick={enviarEmail}>
              Enviar email
            </button>
            <button
              className="bnt-recuperarsenha-abandonar"
              onClick={() => navigate("/")}>
              voltar
            </button>
          </div>
        </section>
      </main>
    </body>
  );
}
