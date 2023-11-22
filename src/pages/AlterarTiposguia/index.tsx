import { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import Swal from "sweetalert2";
import { TiposguiaProps } from "../../@types/Cobranca";
import { useCobranca } from "../../hooks/useCobranca";

export function AlterarTipoguia() {
  const [tiposguia, setTiposguia] = useState<TiposguiaProps>(
    {} as TiposguiaProps
  );
  const { idTipoguia } = useCobranca();
  const desabilitarButtonCadastrar = tiposguia.descricao === "";

  const navigate = useNavigate();

  async function alterarCadastro() {
    try {
      await api.putAtualizaTipoguia(idTipoguia, {
        descricao: tiposguia?.descricao?.toString(),
      });
      Swal.fire({
        icon: "success",
        title: "Cadastro alterado com sucesso!",
        preConfirm: () => {
          navigate(-1);
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function consultaCobranca() {
    if (!idTipoguia) {
      return;
    }
    try {
      const { data } = await api.getTiposguiaByID(idTipoguia);

      setTiposguia((prevState) => {
        return {
          ...prevState,
          descricao: data.descricao,
        };
      });
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

  return (
    <div className="tela-tiposguia-cadastrotiposguia">
      <main className="tela-tiposguia-main-cadastrotiposguia">
        <header className="tela-tiposguia-header-cadastrotiposguia">
          <h2>Alterar tipo da guia</h2>
        </header>

        <section className="tela-tiposguia-formulario-login-tiposguia">
          <div className="tela-tiposguia-floatingInput">
            <input
              type="text"
              className="tela-tiposguia-floatingInput__control"
              style={{ textTransform: "uppercase" }}
              placeholder="Descrição"
              name="descricao"
              value={tiposguia.descricao || ""}
              onChange={(e) =>
                setTiposguia({
                  ...tiposguia,
                  [e.target.name]: e.target.value,
                })
              }
            />

            <label className="tela-tiposguia-floatingInput__label">
              Descrição
            </label>
          </div>
          <div>
            <button
              className={`tela-tiposguia-bnt-cadastrotiposguia ${
                desabilitarButtonCadastrar ? "disabled" : ""
              }`}
              onClick={alterarCadastro}
              disabled={desabilitarButtonCadastrar}>
              alterar
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
