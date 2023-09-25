import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { CobrancaProps } from "../../@types/Cobranca";
import * as api from "../../services/api";
import Swal from "sweetalert2";
import { EmpresaProps } from "../../@types/Client";

export function CadastroCobranca() {
  const [cobranca, setCobranca] = useState<CobrancaProps>({} as CobrancaProps);
  const [empresa, setEmpresa] = useState<EmpresaProps>({} as EmpresaProps);
  const navigate = useNavigate();

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
    <body className="cadastrocobranca">
      <main className="main-cadastrocobranca">
        <header className="header-cadastrocobranca">
          <h2>Cadastrar Cobranca</h2>
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
              onBlur={consultaEmpresa}
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
              onChange={(e) =>
                setEmpresa({
                  ...empresa,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Nome empresa</label>
          </div>

          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Data emissão"
              name="emissao_cobranca"
              value={cobranca.emissao_cobranca || ""}
              onChange={(e) =>
                setCobranca({
                  ...cobranca,
                  [e.target.name]: e.target.value,
                })
              }
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
              onChange={(e) =>
                setCobranca({
                  ...cobranca,
                  [e.target.name]: e.target.value,
                })
              }
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
              onChange={(e) =>
                setCobranca({
                  ...cobranca,
                  [e.target.name]: e.target.value,
                })
              }
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
              onChange={(e) =>
                setCobranca({
                  ...cobranca,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Status</label>
          </div>
          <div>
            <button
              className="bnt-cadastrocobranca"
              onClick={finalizarCadastro}>
              cadastrar
            </button>
          </div>
        </section>
      </main>
    </body>
  );
}
