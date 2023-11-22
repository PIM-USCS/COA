import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import Swal from "sweetalert2";
import { TiposguiaProps } from "../../@types/Cobranca";

export function CadastroTiposguia() {
  const [tiposguia, setTiposguia] = useState<TiposguiaProps>(
    {} as TiposguiaProps
  );
  const desabilitarButtonCadastrar = tiposguia.descricao === "";

  const navigate = useNavigate();

  async function finalizarCadastro() {
    try {
      await api.postCreateTipoguia(tiposguia);
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

  return (
    <div className="tela-tiposguia-cadastrotiposguia">
      <main className="tela-tiposguia-main-cadastrotiposguia">
        <header className="tela-tiposguia-header-cadastrotiposguia">
          <h2>Cadastrar tipo da guia</h2>
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
              onClick={finalizarCadastro}
              disabled={desabilitarButtonCadastrar}>
              cadastrar
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
