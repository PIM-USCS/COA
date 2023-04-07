import { MagnifyingGlass, PencilSimple, Trash } from "phosphor-react";
import "./styles.css";
import { EmpresaListaProps } from "../..";
import { useEmpresa } from "../../../../hooks/useEmpresa";
import * as api from "../../../../services/api";
import Swal from "sweetalert2";
interface CadastroProps {
  empresa: EmpresaListaProps;
}

export function Cliente({ empresa }: CadastroProps) {
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
        <p>{empresa.id}</p>
      </div>
      <div className="nome">
        <p>{empresa.nome}</p>
      </div>
      <div className="pessoa">
        <p>{empresa.tipo_cliente}</p>
      </div>
      <div className="cnpj-cpf">
        <p>{empresa.cnpj || empresa.cpf}</p>
      </div>
      <div className="alterar">
        <button
          onClick={() => {
            setIdEmpresa(empresa.id);
          }}
        >
          <PencilSimple size={24} />
        </button>
      </div>
      <div className="excluir">
        <button onClick={excluirCliente}>
          <Trash size={24} />
        </button>
      </div>
      <div className="consultar">
        <button
          onClick={() => {
            setIdEmpresa(empresa.id);
          }}
        >
          <MagnifyingGlass size={24} />
        </button>
      </div>
    </div>
  );
}
