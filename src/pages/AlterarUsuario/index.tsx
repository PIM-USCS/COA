import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import Swal from "sweetalert2";

interface UsuarioProps {
  nome: string;
  avatar: string;
}

export function AlterarUsuario() {
  const [usuario, setUsuario] = useState<UsuarioProps>({} as UsuarioProps);
  const navigate = useNavigate();

  async function AtualizaCadastro() {
    await api.updateNome("1", {
      nome: usuario.nome.toString(),
    });
    Swal.fire({
      icon: "success",
      title: "Cadastro atualizado com sucesso!",
      confirmButtonText: "OK",
      preConfirm: () => {
        navigate(-1);
      },
    });
  }

  return (
    <body className="cadastrousuario">
      <main className="main-cadastrousuario">
        <header className="header-cadastrousuario">
          <h2>Alterar Usuário</h2>
        </header>
        <section>
          <div className="floatingInput">
            <input
              type="file"
              /*id="nome-cadastrousuario"*/
              className="floatingInput__control"
              placeholder="Nome"
              name="nome"
              value={usuario.avatar || ""}
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="floatingInput">
            <input
              type="email"
              /*id="email-cadastrousuario"*/
              className="floatingInput__control"
              placeholder="E-mail"
              name="email"
              value={usuario.nome || ""}
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Nome</label>
          </div>
          <div>
            <button
              className="bnt-cadastrousuario"
              onClick={AtualizaCadastro}>
              Atualizar Cadastro
            </button>
          </div>
        </section>
      </main>
    </body>
  );
}
