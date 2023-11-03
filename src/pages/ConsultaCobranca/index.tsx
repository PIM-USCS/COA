/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { CobrancaProps } from "../../@types/Cobranca";
import * as api from "../../services/api";
import Swal from "sweetalert2";
import { EmpresaProps } from "../../@types/Client";
import { useCobranca } from "../../hooks/useCobranca";
import { ReciboProps } from "../../@types/Recibo";
import { ModalImagem } from "./Components/ModalImagem";

export function ConsultaCobranca() {
  const [cobranca, setCobranca] = useState<CobrancaProps>({} as CobrancaProps);
  const [empresa, setEmpresa] = useState<EmpresaProps>({} as EmpresaProps);
  const [recibos, setRecibos] = useState<ReciboProps[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [caminhoArquivo, setCaminhoArquivo] = useState<File | undefined>();

  const { idCobranca } = useCobranca();
  const navigate = useNavigate();

  function openModalImagem(arquivo: File) {
    setCaminhoArquivo(arquivo);
    setIsOpenModal(true);
  }

  async function consultaCobranca() {
    if (!idCobranca) {
      return;
    }
    try {
      const { data } = await api.getCobrancaById(idCobranca);

      setCobranca((prevState) => {
        return {
          ...prevState,
          emissao_cobranca: data.emissao_cobranca,
          vencimento_cobranca: data.vencimento_cobranca,
          valor: data.valor,
          status: data.status,
          id_empresa: data.id_empresa,
          descricao: data.descricao,
        };
      });

      if (data.id_empresa) {
        consultaEmpresa(data.id_empresa);
      }
      if (data.id) {
        consultaRecibo(data.id);
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Não foi possível localizar a cobrança com este ID!",
      });
    }
  }

  useEffect(() => {
    consultaCobranca();
  }, []);

  async function consultaEmpresa(idEmpresa: string) {
    if (!idEmpresa) {
      return;
    }

    try {
      const { data } = await api.getEmpresaByID(idEmpresa);

      setEmpresa((prevState) => {
        return {
          ...prevState,
          nome: data.nome,
          id: data.id,
        };
      });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Não foi possível localizar a empresa com este ID!",
      });
    }
  }

  useEffect(() => {
    if (cobranca.id_empresa) {
      consultaEmpresa(cobranca.id_empresa);
    }
  }, [cobranca.id_empresa]);

  async function consultaRecibo(idCobranca: string) {
    try {
      if (!idCobranca) {
        return;
      }
      const response = await api.getReciboByIDCobranca(idCobranca);

      const recibos = response.data;

      if (recibos && recibos.length > 0) {
        setRecibos(recibos);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    consultaRecibo(idCobranca);
  }, [idCobranca]);

  return (
    <>
      <ModalImagem
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        arquivo={caminhoArquivo}
      />
      <div className="cadastrocobranca">
        <main className="main-cadastrocobranca">
          <header className="header-cadastrocobranca">
            <h2>Consulta Cobranca</h2>
          </header>
          <section>
            <div className="floatingInput">
              <input
                type="text"
                className="floatingInput__control"
                placeholder="Id Empresa"
                name="id"
                value={empresa.id || ""}
                readOnly
              />
              <label className="floatingInput__label">Id Empresa</label>
            </div>
            <div className="floatingInput">
              <input
                type="text"
                className="floatingInput__control"
                placeholder="Nome empresa"
                name="nome"
                value={empresa.nome || ""}
                readOnly
              />
              <label className="floatingInput__label">Nome empresa</label>
            </div>

            <div className="tela-cobranca-floatingInput">
              <input
                type="text"
                className="tela-cobranca-floatingInput__control"
                placeholder="Descrição"
                name="descricao"
                value={cobranca.descricao || ""}
                readOnly
              />
              <label className="tela-cobranca-floatingInput__label">
                Descrição
              </label>
            </div>
            <div className="floatingInput">
              <input
                type="text"
                className="floatingInput__control"
                placeholder="Data emissão"
                name="emissao_cobranca"
                value={cobranca.emissao_cobranca || ""}
                readOnly
              />
              <label className="floatingInput__label">Data emissão</label>
            </div>
            <div className="floatingInput">
              <input
                type="text"
                className="floatingInput__control"
                placeholder="Data vencimento"
                name="vencimento_cobranca"
                value={cobranca.vencimento_cobranca || ""}
                readOnly
              />
              <label className="floatingInput__label">Data vencimento</label>
            </div>
            <div className="floatingInput">
              <input
                type="text"
                className="floatingInput__control"
                placeholder="Valor"
                name="valor"
                value={cobranca.valor || ""}
                readOnly
              />

              <label className="floatingInput__label">Valor</label>
            </div>
            <div className="floatingInput">
              <input
                type="text"
                className="floatingInput__control"
                placeholder="Status"
                name="status"
                value={cobranca.status || ""}
                readOnly
              />
              <label className="floatingInput__label">Status</label>
            </div>
            <div>
              <h2 className="header-cadastrocobranca">Rebibos</h2>
            </div>
            <div>
              <table style={{ fontSize: "22px" }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Data do Recibo</th>
                    <th>Visualizar Imagem</th>
                  </tr>
                </thead>
                <tbody>
                  {recibos.map((recibo) => (
                    <tr key={recibo.id}>
                      <td>{recibo.id}</td>
                      <td>{recibo.data_recibo}</td>
                      <td>
                        <button
                          className="botao-table-view"
                          onClick={() => {
                            if (recibo.arquivo) {
                              openModalImagem(recibo.arquivo);
                            }
                          }}>
                          Visualizar imagem
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
