/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import "./styles.css";

import { NavLink, useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import { ArrowLeft, IdentificationCard, WarningCircle } from "phosphor-react";
import { CobrancaProps } from "../../@types/Cobranca";
import { EmpresaProps } from "../../@types/Client";
import { useCobranca } from "../../hooks/useCobranca";
import Swal from "sweetalert2";
import { recibos } from "../Home/Componentes/Guias";

export function CobrancaLista() {
  const [cobranca, setCobranca] = useState<CobrancaProps[]>([]);
  const [empresa, setEmpresa] = useState<EmpresaProps[]>([]);

  const { setIdCobranca } = useCobranca();
  const navigate = useNavigate();

  const getCobranca = async () => {
    try {
      const { data } = await api.getCobrancas();

      setCobranca(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCobranca();
  }, []);

  const consultaEmpresas = async () => {
    const empresasConsultadas = await Promise.all(
      cobranca.map(async (cobrancaItem) => {
        if (cobrancaItem.id_empresa) {
          const { data } = await api.getEmpresaByID(cobrancaItem.id_empresa);
          return { id: cobrancaItem.id_empresa, nome: data.nome };
        }
        return null;
      })
    );

    const empresasFiltradas = empresasConsultadas.filter(
      (empresa) => empresa !== null
    ) as EmpresaProps[];

    setEmpresa(empresasFiltradas);
  };

  useEffect(() => {
    consultaEmpresas();
  }, [cobranca]);

  function EnviarRecibo(id: string) {
    if (!id) {
      return;
    }
    setIdCobranca(id);
    navigate("/enviar-recibo");
  }

  async function DeletarCobranca(id: string) {
    if (!id) {
      return;
    }
    Swal.fire({
      title: "Tem certeza que deseja deletar esta cobrança?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Não",
      confirmButtonText: "Sim, desejo deletar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.deleteCobranca(id);
        Swal.fire({
          icon: "success",
          title: "Processo concluído!",
          text: "Cobrança deletada com sucesso!",
          confirmButtonText: "OK",
          preConfirm: () => {
            window.location.reload();
          },
        });
      }
    });
  }

  function consultarCobranca(id: string) {
    if (!id) {
      return;
    }
    setIdCobranca(id);

    navigate("/consultar-cobranca");
  }
  return (
    <main className="main-principal">
      <header className="tela-cobranca-header">
        <div>
          <button
            className="tela-cobranca-return"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft size={36} />
          </button>
        </div>

        <div className="div-cadastrar-cobranca">
          <h1>Listagem de guias</h1>
          <NavLink to="/cadastro-cobrancas" style={{ textDecoration: "none" }}>
            <button>
              <IdentificationCard size={32} weight="fill" />
              Nova Guia
            </button>
          </NavLink>
        </div>
      </header>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Empresa</th>
            <th>Vencimento</th>
            <th>Valor</th>

            <th>Status</th>
            <th>Enviar recibo</th>
            <th>Alterar</th>
            <th>Excluir</th>
            <th>Consultar</th>
          </tr>
        </thead>
        <tbody>
          {cobranca.map((cobrancaItem) => (
            <tr key={cobrancaItem.id} className="tabela-row">
              <td>{cobrancaItem.id}</td>
              <td>
                {empresa.find((emp) => emp.id === cobrancaItem.id_empresa)
                  ?.nome || "N/A"}
              </td>
              <td>{cobrancaItem.vencimento_cobranca}</td>
              <td>{cobrancaItem.valor}</td>
              <td>{cobrancaItem.status}</td>

              <td>
                <button
                  className="botao-table-edit"
                  onClick={() => EnviarRecibo(cobrancaItem.id)}
                >
                  Enviar recibo
                </button>
              </td>
              <td>
                <button className="botao-table-edit">Editar</button>
              </td>
              <td>
                <button
                  className="botao-table-delete"
                  onClick={() => DeletarCobranca(cobrancaItem.id)}
                >
                  Excluir
                </button>
              </td>
              <td>
                <button
                  className="botao-table-view"
                  onClick={() => consultarCobranca(cobrancaItem.id)}
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
