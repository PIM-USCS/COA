import { Cliente } from "./Componentes/Clientes";
import "./styles.css";

export function ClienteLista() {
  return (
    <body className="container-geral">
      <header className="container-titulo">
        <h1>Listagem de clientes</h1>
        <button>Cadastrar cliente</button>
      </header>
      <div className="container-header">
        <div className="div-id">
          <p>ID</p>
        </div>
        <div className="div-nome">
          <p>Nome</p>
        </div>
        <div className="div-pessoa">
          <p>Tipo pessoa</p>
        </div>
        <div className="div-cnpj-cpf">
          <p>CNPJ/CPF</p>
        </div>
        <div className="div-alterar">
          <p>Alterar</p>
        </div>
        <div className="div-excluir">
          <p>Excluir</p>
        </div>
        <div className="div-consultar">
          <p>Consultar</p>
        </div>
      </div>
      <div className="container-lista">
        <Cliente />
        <Cliente />
        <Cliente />
        <Cliente />
        <Cliente />
        <Cliente />
      </div>
    </body>
  );
}
