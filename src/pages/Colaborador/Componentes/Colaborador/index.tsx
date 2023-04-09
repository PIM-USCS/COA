import { MagnifyingGlass, PencilSimple, Trash } from "phosphor-react";
import "./styles.css";
import { useEmpresa } from "../../../../hooks/useEmpresa";
import * as api from "../../../../services/api";
import Swal from "sweetalert2";
import { ColaboradorListaProps } from "../../../../@types/Colaborador";
interface CadastroProps {
  colaborador: ColaboradorListaProps;
}

export function Colaborador({ colaborador }: CadastroProps) {
  const { idEmpresa, setIdEmpresa } = useEmpresa();

  async function excluirCliente() {
    Swal.fire({
      title: "Tem certeza que deseja deletar este cliente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Não",
      confirmButtonText: "Sim, desejo deletar!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.deleteEmpresa(idEmpresa);
        Swal.fire({
          icon: "success",
          title: "Processo concluido!",
          text: "Cliente deletado com sucesso!",
          confirmButtonText: "OK",
          preConfirm: () => {
            window.location.reload();
          },
        });
      }
    });
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
        <button
         
        >
          <PencilSimple size={24} />
        </button>
      </div>
      <div className="excluir">
        <button >
          <Trash size={24} />
        </button>
      </div>
      <div className="consultar">
        <button
          
        >
          <MagnifyingGlass size={24} />
        </button>
      </div>
    </div>
  );
}