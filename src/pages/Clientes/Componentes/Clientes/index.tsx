import { MagnifyingGlass, PencilSimple, Trash } from "phosphor-react";
import "./styles.css";
import { EmpresaListaProps } from "../..";
import { useEmpresa } from "../../../../hooks/useEmpresa";
import * as api from "../../../../services/api";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
interface CadastroProps {
  empresa: EmpresaListaProps;
}

export function Cliente({ empresa }: CadastroProps) {
  const { idEmpresa, setIdEmpresa } = useEmpresa();

  async function excluirCliente() {
    setIdEmpresa(empresa.id);

    if (!idEmpresa) {
      return;
    }
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

  function alterarCliente() {
    setIdEmpresa(empresa.id);

    if (!idEmpresa) {
      return;
    }
  }

  function consultarCliente() {
    setIdEmpresa(empresa.id);

    if (!idEmpresa) {
      return;
    }
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
        <NavLink to="/alterar-cadastro-cliente" style={{ all: "unset" }}>
          <button onClick={alterarCliente}>
            <PencilSimple size={24} />
          </button>
        </NavLink>
      </div>
      <div className="excluir">
        <button onClickCapture={excluirCliente}>
          <Trash size={24} />
        </button>
      </div>
      <div className="consultar">
        <NavLink to="/consultar-cliente" style={{ all: "unset" }}>
          <button onClick={consultarCliente}>
            <MagnifyingGlass size={24} />
          </button>
        </NavLink>
      </div>
    </div>
  );
}
