import { MagnifyingGlass, PencilSimple, Trash } from "phosphor-react";
import "./styles.css";
import * as api from "../../../../services/api";
import Swal from "sweetalert2";
import { ColaboradorListaProps } from "../../../../@types/Colaborador";
import { useColaborador } from "../../../../hooks/useColaborador";
import { NavLink } from "react-router-dom";
interface CadastroProps {
  colaborador: ColaboradorListaProps;
}

export function Colaborador({ colaborador }: CadastroProps) {
  const { idColaborador, setIdColaborador } = useColaborador();

  async function excluirColaborador() {
    Swal.fire({
      title: "Tem certeza que deseja deletar este colaborador?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Não",
      confirmButtonText: "Sim, desejo deletar!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.deleteColaborador(idColaborador);
        Swal.fire({
          icon: "success",
          title: "Processo concluido!",
          text: "Colaborador deletado com sucesso!",
          confirmButtonText: "OK",
          preConfirm: () => {
            window.location.reload();
          },
        });
      }
    });
  }

  function alterarCliente() {
    setIdColaborador(colaborador.id);
  }

  return (
    <div className="lista">
      <div className="id">
        <p>{colaborador.id}</p>
      </div>
      <div className="nome">
        <p>{colaborador.nome}</p>
      </div>
      <div className="pessoa">
        <p>{colaborador.email}</p>
      </div>
      <div className="alterar">
        <NavLink
          to="alterar-cadastro-cliente"
          style={{ textDecoration: "none" }}>
          <button onClickCapture={alterarCliente}>
            <PencilSimple size={24} />
          </button>
        </NavLink>
      </div>
      <div className="excluir" onClickCapture={excluirColaborador}>
        <button>
          <Trash size={24} />
        </button>
      </div>
      <div className="consultar">
        <button>
          <MagnifyingGlass size={24} />
        </button>
      </div>
    </div>
  );
}
