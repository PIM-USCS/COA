import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { CobrancaProps } from "../../@types/Cobranca";
import * as api from "../../services/api";
import Swal from "sweetalert2";
import { EmpresaProps } from "../../@types/Client";
import maskData from "../../utils/maskData";
import maskMoney from "../../utils/maskMoney";

export function CadastroCobranca() {
  const [cobranca, setCobranca] = useState<CobrancaProps>({} as CobrancaProps);
  const [empresa, setEmpresa] = useState<EmpresaProps>({} as EmpresaProps);
  const navigate = useNavigate();

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

  async function finalizarCadastro() {
    try {
      await api.postCreateCobranca(empresa.id, cobranca);
    } catch (error) {
      console.error(error);
    } finally {
      Swal.fire({
        icon: "success",
        title: "Cadastro concluído com sucesso!",
        preConfirm: () => {
          navigate(-1);
        },
      });
    }
  }

  async function consultaEmpresa() {
    if (!empresa.id) {
      return;
    }
    try {
      const { data } = await api.getEmpresaByID(empresa.id);

      setEmpresa((prevState) => {
        return {
          ...prevState,
          nome: data.nome,
        };
      });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Não foi possivel localizar a empresa com este ID!",
      });
    }
  }

  return (
    <>
      {/* <LoadingIcon /> */}
      <div className="tela-cobranca-cadastrocobranca">
        <main className="tela-cobranca-main-cadastrocobranca">
          <header className="tela-cobranca-header-cadastrocobranca">
            <h2>Cadastrar Cobranca</h2>
          </header>
          <section>
            <div className="tela-cobranca-floatingInput">
              <input
                type="text"
                className="tela-cobranca-floatingInput__control"
                placeholder="Id Empresa"
                name="id"
                value={empresa.id || ""}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    [e.target.name]: e.target.value,
                  })
                }
                onBlur={consultaEmpresa}
              />
              <label className="tela-cobranca-floatingInput__label">
                Id Empresa
              </label>
            </div>
            <div className="tela-cobranca-floatingInput">
              <input
                type="text"
                className="tela-cobranca-floatingInput__control"
                placeholder="Nome empresa"
                name="nome"
                value={empresa.nome || ""}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <label className="tela-cobranca-floatingInput__label">
                Nome empresa
              </label>
            </div>

            <div className="tela-cobranca-floatingInput">
              <input
                type="text"
                className="tela-cobranca-floatingInput__control"
                placeholder="Data emissão"
                name="emissao_cobranca"
                value={cobranca.emissao_cobranca || ""}
                onChange={mascaraDataEmissao}
              />
              <label className="tela-cobranca-floatingInput__label">
                Data emissão
              </label>
            </div>
            <div className="tela-cobranca-floatingInput">
              <input
                type="text"
                className="tela-cobranca-floatingInput__control"
                placeholder="Data vencimento"
                name="vencimento_cobranca"
                value={cobranca.vencimento_cobranca || ""}
                onChange={mascaraDataVencimento}
              />
              <label className="tela-cobranca-floatingInput__label">
                Data vencimento
              </label>
            </div>
            <div className="tela-cobranca-floatingInput">
              <input
                type="text"
                className="tela-cobranca-floatingInput__control"
                placeholder="Valor"
                name="valor"
                value={cobranca.valor || ""}
                onChange={mascaraDinheiro}
              />

              <label className="tela-cobranca-floatingInput__label">
                Valor
              </label>
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

            <div>
              <button
                className="tela-cobranca-bnt-cadastrocobranca"
                onClick={finalizarCadastro}
              >
                cadastrar
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
