import { MagnifyingGlass, PencilSimple, Trash } from "phosphor-react";
import "./styles.css";

export function Cliente() {
  return (
    <div className="lista">
      <div className="id">
        <p>1</p>
      </div>
      <div className="nome">
        <p>Cliente teste</p>
      </div>
      <div className="pessoa">
        <p>Pessoa Física</p>
      </div>
      <div className="cnpj-cpf">
        <p>1234567891123</p>
      </div>
      <div className="alterar">
        <button>
          <PencilSimple size={22} />
        </button>
      </div>
      <div className="excluir">
        <button>
          <Trash size={22} />
        </button>
      </div>
      <div className="consultar">
        <button>
          <MagnifyingGlass size={22} />
        </button>
      </div>
    </div>
  );
}
