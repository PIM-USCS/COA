import { ArrowLeft, Buildings } from "phosphor-react";

import "./styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as api from "../../services/api";

import Swal from "sweetalert2";
import { useEmpresa } from "../../hooks/useEmpresa";

export interface EmpresaListaProps {
  id: string;
  cpf: string;
  cnpj: string;
  nome: string;
  tipo_cliente: string;
}
export function EmpresaLista() {
  const [empresa, setEmpresa] = useState<EmpresaListaProps[]>([]);
  const navigate = useNavigate();
  const getEmpresa = async () => {
    try {
      const { data } = await api.getEmpresa();

      setEmpresa(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getEmpresa();
  }, []);

  const { setIdEmpresa, setIdCliente } = useEmpresa();

  async function excluirCliente(id: string) {
    if (!id) {
      return;
    }

    Swal.fire({
      title: "Tem certeza que deseja deletar este cliente?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Não",
      confirmButtonText: "Sim, desejo deletar!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.deleteEmpresa(id);
        Swal.fire({
          icon: "success",
          title: "Processo concluído!",
          text: "Cliente deletado com sucesso!",
          confirmButtonText: "OK",
          preConfirm: () => {
            window.location.reload();
          },
        });
      }
    });
  }

  function alterarCliente(id: string) {
    if (!id) {
      return;
    }
    setIdEmpresa(id);
    setIdCliente(id);
    navigate("/alterar-cadastro-cliente");
  }

  function consultarCliente(id: string) {
    if (!id) {
      return;
    }
    setIdEmpresa(id);
    setIdCliente(id);
    navigate("/consultar-cliente");
  }

  return (
    <main className="main-principal">
      <header className="tela-empresa-header">
        <div>
          <button
            className="tela-empresa-return"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft size={36} />
          </button>
        </div>
        <div className="div-cadastrar-empresa">
          <h1>Listagem de empresas</h1>
          <NavLink to="/cadastro-cliente" style={{ textDecoration: "none" }}>
            <button>
              <Buildings size={38} />
              Nova Empresa
            </button>
          </NavLink>
        </div>
      </header>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tipo pessoa</th>
            <th>CNPJ/CPF</th>
            <th>Alterar</th>
            <th>Excluir</th>
            <th>Consultar</th>
          </tr>
        </thead>
        <tbody>
          {empresa.map((empresas) => (
            <tr key={empresas.id} className="tabela-row">
              <td>{empresas.id}</td>
              <td>{empresas.nome}</td>
              <td>{empresas.tipo_cliente}</td>
              <td>{empresas.cnpj || empresas.cpf}</td>
              <td>
                <button
                  className="botao-table-edit"
                  onClick={() => alterarCliente(empresas.id)}
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  className="botao-table-delete"
                  onClick={() => excluirCliente(empresas.id)}
                >
                  Excluir
                </button>
              </td>
              <td>
                <button
                  className="botao-table-view"
                  onClick={() => consultarCliente(empresas.id)}
                >
                  Consultar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
