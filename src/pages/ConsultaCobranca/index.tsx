import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { CobrancaProps } from "../../@types/Cobranca";
import * as api from "../../services/api";
import Swal from "sweetalert2";
import { EmpresaProps } from "../../@types/Client";

export function ConsultaCobranca() {
  const [cobranca] = useState<CobrancaProps>({} as CobrancaProps);
  const [empresa, setEmpresa] = useState<EmpresaProps>({} as EmpresaProps);
  const navigate = useNavigate();

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
    <div className="cadastrocobranca">
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
            />
            <label className="floatingInput__label">Status</label>
          </div>
          <div>
            <h2 className="header-cadastrocobranca">Rebibos</h2>
          </div>
          <div></div>
        </section>
      </main>
    </div>
  );
}
