import { useEffect, useState } from "react";
import { ColaboradorListaProps } from "../../@types/Colaborador";

import "./styles.css";

import { NavLink, useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import { ArrowLeft, IdentificationCard } from "phosphor-react";
import { useColaborador } from "../../hooks/useColaborador";
import Swal from "sweetalert2";

export function ColaboradorLista() {
  const [colaborador, setColaborador] = useState<ColaboradorListaProps[]>([]);
  const navigate = useNavigate();
  const { idColaborador, setIdColaborador } = useColaborador();

  const getColaborador = async () => {
    try {
      const { data } = await api.getColaborador();

      setColaborador(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getColaborador();
  }, []);

  async function excluirColaborador(id: string) {
    if (!id) {
      return;
    }

    Swal.fire({
      title: "Tem certeza que deseja deletar este colaborador?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Não",
      confirmButtonText: "Sim, desejo deletar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.deleteColaborador(id);
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

  function alterarColaborador(id: string) {
    if (!id) {
      return;
    }
    setIdColaborador(id);
    navigate("/alterar-cadastro-colaborador");
  }

  function consultarColaborador(id: string) {
    if (!id) {
      return;
    }
    setIdColaborador(id);
    navigate("/consultar-colaborador");
  }

  return (
    <main className="main-principal">
      <header className="tela-colaborador-header">
        <div>
          <button
            className="tela-colaborador-return"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft size={36} />
          </button>
        </div>
        <div className="div-cadastrar-colaborador">
          <h1>Listagem de colaborador</h1>
          <NavLink
            to="/cadastro-colaborador"
            style={{ textDecoration: "none" }}
          >
            <button>
              <IdentificationCard size={32} weight="fill" />
              Novo Colaborador
            </button>
          </NavLink>
        </div>
      </header>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Alterar</th>
            <th>Excluir</th>
            <th>Consultar</th>
          </tr>
        </thead>
        <tbody>
          {colaborador.map((colaboradores) => (
            <tr key={colaboradores.id} className="tabela-row">
              <td>{colaboradores.id}</td>
              <td>{colaboradores.nome}</td>
              <td>{colaboradores.telefone}</td>
              <td>
                <button
                  className="botao-table-edit"
                  onClick={() => alterarColaborador(colaboradores.id)}
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  className="botao-table-delete"
                  onClick={() => excluirColaborador(colaboradores.id)}
                >
                  Excluir
                </button>
              </td>
              <td>
                <button
                  className="botao-table-view"
                  onClick={() => consultarColaborador(colaboradores.id)}
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
