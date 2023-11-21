import { useEffect, useState } from "react";

import "./styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import { ArrowLeft, IdentificationCard } from "phosphor-react";
import Swal from "sweetalert2";
import { TiposguiaProps } from "../../@types/Cobranca";
import { useCobranca } from "../../hooks/useCobranca";

export function TiposguiaLista() {
  const [tiposguia, setTiposguia] = useState<TiposguiaProps[]>([]);
  const navigate = useNavigate();
  const { setIdTipoguia } = useCobranca();

  const getTiposguia = async () => {
    try {
      const { data } = await api.getTiposguia();

      setTiposguia(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTiposguia();
  }, []);

  async function excluirTipoguia(id: string) {
    try {
      if (!id) {
        return;
      }

      Swal.fire({
        title: "Tem certeza que deseja deletar este tipo de guia?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Não",
        confirmButtonText: "Sim, desejo deletar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await api.deleteTipoguia(id);
          Swal.fire({
            icon: "success",
            title: "Processo concluido!",
            text: "Tipo de guia deletada com sucesso!",
            confirmButtonText: "OK",
            preConfirm: () => {
              window.location.reload();
            },
          });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Não foi possivel excluir o tipo de guia",
      });
      console.error(error);
    }
  }

  function alterarTipoguia(id: string) {
    if (!id) {
      return;
    }
    setIdTipoguia(id);
    navigate("/alterar-tipoguia");
  }

  return (
    <main className="main-principal">
      <header className="tela-tiposguia-header">
        <div>
          <button
            className="tela-tiposguia-return"
            onClick={() => navigate("/home")}>
            <ArrowLeft size={36} />
          </button>
        </div>
        <div className="div-cadastrar-tiposguia">
          <h1>Tipos de guias</h1>
          <NavLink to="/cadastro-tiposguia" style={{ textDecoration: "none" }}>
            <button>
              <IdentificationCard size={32} weight="fill" />
              Novo tipo
            </button>
          </NavLink>
        </div>
      </header>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Alterar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {tiposguia.map((tipoguia) => (
            <tr key={tipoguia.id} className="tabela-row">
              <td>{tipoguia.id}</td>
              <td>{tipoguia.descricao}</td>
              <td>
                <button
                  className="botao-table-edit"
                  onClick={() => alterarTipoguia(tipoguia.id)}>
                  Editar
                </button>
              </td>
              <td>
                <button
                  className="botao-table-delete"
                  onClick={() => excluirTipoguia(tipoguia.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
