import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { ColaboradorProps } from "../../@types/Colaborador";
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
    <body className="cadastrocolaborador">
      <main className="main-cadastrocolaborador">
        <header className="header-cadastrocolaborador">
          <h2>Alterar Usuário</h2>
        </header>
        <section>
          <div className="floatingInput">
            <input
              type="file"
              /*id="nome-cadastrocolaborador"*/
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
              /*id="email-cadastrocolaborador"*/
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
              className="bnt-cadastrocolaborador"
              onClick={AtualizaCadastro}>
              Atualizar Cadastro
            </button>
          </div>
        </section>
      </main>
    </body>
  );
}
