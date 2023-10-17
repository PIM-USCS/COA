import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import Swal from "sweetalert2";
import { AtuUsuario } from "../../@types/Usuario";
import { useUsuario } from "../../hooks/useUsuario";

export function AlterarUsuario() {
  const { idUsuario } = useUsuario();
  const [usuario, setUsuario] = useState<AtuUsuario>({
    id: idUsuario || "",
    nome: "",
    avatar: undefined,
  });

  const navigate = useNavigate();

  async function AtualizaCadastro() {
    try {
      if (!usuario.avatar) {
        throw new Error("Por favor, selecione um avatar.");
      }

      const formData = new FormData();
      formData.append("avatar", usuario.avatar);

      await api.patchAtualizaAvatar(usuario.id, formData);

      Swal.fire({
        icon: "success",
        title: "Cadastro atualizado com sucesso!",
        confirmButtonText: "OK",
        preConfirm: () => {
          navigate(-1);
        },
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Erro ao atualizar o avatar",
        text: "error.message",
        confirmButtonText: "OK",
      });
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    setUsuario({
      ...usuario,
      avatar: file,
    });
  }

  return (
    <div className="cadastrousuario">
      <main className="main-cadastrousuario">
        <header className="header-cadastrousuario">
          <h2>Alterar imagem do Usuário</h2>
        </header>
        <section>
          <div className="floatingInput">
            <input
              type="file"
              className="floatingInput__control"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <button className="bnt-cadastrousuario" onClick={AtualizaCadastro}>
              Atualizar Cadastro
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
