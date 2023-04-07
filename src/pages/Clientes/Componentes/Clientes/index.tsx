import { MagnifyingGlass, PencilSimple, Trash } from "phosphor-react";
import "./styles.css";
import { EmpresaListaProps } from "../..";
import { useEmpresa } from "../../../../hooks/useEmpresa";
import * as api from "../../../../services/api";
interface CadastroProps {
  empresa: EmpresaListaProps;
}

export function Cliente({ empresa }: CadastroProps) {
  const { setIdEmpresa } = useEmpresa();

  async function excluirCliente() {}

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
