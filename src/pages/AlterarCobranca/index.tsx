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
import maskData from "../../utils/maskData";
import maskMoney from "../../utils/maskMoney";

export function AlterarCobranca() {
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

  const mascaraDataEmissao = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, valorFormatado } = maskData(e);

    setCobranca({
      ...cobranca,
      [name]: valorFormatado,
    });
  };

  const mascaraDataVencimento = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, valorFormatado } = maskData(e);
    if (!cobranca.emissao_cobranca) {
      return;
    }

    setCobranca({
      ...cobranca,
      [name]: valorFormatado,
    });
  };

  const mascaraDinheiro = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, valorFormatado } = maskMoney(e);

    setCobranca({
      ...cobranca,
      [name]: valorFormatado,
    });
  };

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

  async function deletarRecibo(id: string) {
    if (id) {
      Swal.fire({
        title: "Tem certeza que deseja deletar este recibo?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Não",
        confirmButtonText: "Sim, desejo deletar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await api.deleteRecibo(id);
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
  }

  async function confirmarCadastro() {
    try {
      await api.postAtualizaCobranca(idCobranca, {
        id_empresa: empresa.id?.toString(),
        emissao_cobranca: cobranca.emissao_cobranca?.toString(),
        vencimento_cobranca: cobranca.vencimento_cobranca?.toString(),
        status: cobranca.status?.toString(),
        valor: cobranca.valor?.toString(),
        descricao: cobranca.descricao?.toString(),
      });
      Swal.fire({
        icon: "success",
        title: "Cadastro atualizado com sucesso!",
        preConfirm: () => {
          navigate(-1);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    localStorage.setItem("cobranca", JSON.stringify(cobranca));
    localStorage.setItem("empresa", JSON.stringify(empresa));
    localStorage.setItem("recibos", JSON.stringify(recibos));
  }, [cobranca, empresa, recibos]);

  useEffect(() => {
    const storedCobranca = localStorage.getItem("cobranca");
    const storedEmpresa = localStorage.getItem("empresa");
    const storedRecibos = localStorage.getItem("recibos");

    if (storedCobranca) {
      setCobranca(JSON.parse(storedCobranca));
    }

    if (storedEmpresa) {
      setEmpresa(JSON.parse(storedEmpresa));
    }

    if (storedRecibos) {
      setRecibos(JSON.parse(storedRecibos));
    }
  }, []);

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
            <h2>Alterar Cobranca</h2>
          </header>
          <section>
            <div className="floatingInput">
              <input
                type="text"
                className="floatingInput__control"
                placeholder="Id Empresa"
                name="id"
                value={empresa.id || ""}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    [e.target.name]: e.target.value,
                  })
                }
                onBlur={() => consultaEmpresa(empresa.id)}
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
                onChange={(e) =>
                  setCobranca({
                    ...cobranca,
                    [e.target.name]: e.target.value,
                  })
                }
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
                onChange={mascaraDataEmissao}
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
                onChange={mascaraDataVencimento}
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
                onChange={mascaraDinheiro}
              />

              <label className="floatingInput__label">Valor</label>
            </div>
            <div className="tela-cobranca-status">
              <div className="tela-cobranca-div-status">
                <input
                  type="radio"
                  name="Pago"
                  className="tela-cobranca-input-status"
                  value="1"
                  checked={cobranca.status === "Pago"}
                  onChange={() => setCobranca({ ...cobranca, status: "Pago" })}
                />
                <label htmlFor="status" className="tela-cobranca-label-status">
                  Pago
                </label>
              </div>
              <div className="tela-cobranca-div-status">
                <input
                  type="radio"
                  name="Em aberto"
                  className="tela-cobranca-input-status"
                  value="Em aberto"
                  checked={cobranca.status === "Em aberto"}
                  onChange={() =>
                    setCobranca({ ...cobranca, status: "Em aberto" })
                  }
                />
                <label htmlFor="status" className="tela-cobranca-label-status">
                  Em aberto
                </label>
              </div>
              <div className="tela-cobranca-div-status">
                <input
                  type="radio"
                  name="Vencida"
                  className="tela-cobranca-input-status"
                  value="Vencida"
                  checked={cobranca.status === "Vencida"}
                  onChange={() =>
                    setCobranca({ ...cobranca, status: "Vencida" })
                  }
                />
                <label htmlFor="status" className="tela-cobranca-label-status">
                  Vencida
                </label>
              </div>
            </div>
            <button onClick={confirmarCadastro} className="botao-table-view">
              Confirmar alterações
            </button>
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
                    <th>Excluir recibo</th>
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
                      <td>
                        <button
                          className="botao-table-view"
                          onClick={() => {
                            if (recibo.id !== undefined) {
                              deletarRecibo(recibo.id);
                            }
                          }}>
                          Excluir recibo
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
