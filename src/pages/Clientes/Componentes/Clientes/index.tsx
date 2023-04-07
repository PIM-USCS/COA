import { MagnifyingGlass, PencilSimple, Trash } from "phosphor-react";
import "./styles.css";
import { EmpresaListaProps } from "../..";

interface CadastroProps {
  empresa: EmpresaListaProps;
}

export function Cliente({ empresa }: CadastroProps) {
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
        <button>
          <PencilSimple size={24} />
        </button>
      </div>
      <div className="excluir">
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
