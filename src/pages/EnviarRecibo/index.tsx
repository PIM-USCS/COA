import "./styles.css";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import maskData from "../../utils/maskData";
import { useCobranca } from "../../hooks/useCobranca";
import { CobrancaProps } from "../../@types/Cobranca";
/* eslint-disable react-hooks/exhaustive-deps */
interface ReciboProps {
  id?: string;
  data_recibo: string;
  anexo?: File | null;
}

export function EnviarRecibo() {
  const { idCobranca } = useCobranca();
  const [recibo, setRecibo] = useState<ReciboProps>({
    data_recibo: "",
    anexo: undefined,
  });
  const [cobranca, setCobranca] = useState<CobrancaProps>({} as CobrancaProps);

  const navigate = useNavigate();

  const consultaCobranca = async () => {
    if (!idCobranca) {
      return;
    }
    const { data } = await api.getCobrancaById(idCobranca);

    setCobranca({
      ...cobranca,
      id: data.id,
    });
  };

  useEffect(() => {
    consultaCobranca();
  }, []);

  async function criarRecibo() {
    try {
      await api.postCreateRecibo(idCobranca, recibo);
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Erro ao criar o recibo",
        confirmButtonText: "OK",
      });
    }
  }
  async function atualizaarquivo() {
    try {
      if (recibo.anexo && recibo.anexo instanceof File) {
        const formData = new FormData();
        formData.append("anexo", recibo.anexo);

        await api.patchAtualizaarquivo("4", formData);

        Swal.fire({
          icon: "success",
          title: "Arquivo atualizado com sucesso!",
          confirmButtonText: "OK",
          preConfirm: () => {
            navigate(-1);
          },
        });
      } else {
        throw new Error("Por favor, selecione um recibo.");
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Erro ao atualizar o arquivo",
        confirmButtonText: "OK",
      });
    }
  }

  function teste() {
    criarRecibo();
    atualizaarquivo();
  }

  const mascaraDataRecibo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, valorFormatado } = maskData(e);

    setRecibo({
      ...recibo,
      [name]: valorFormatado,
    });
  };

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    setRecibo({
      ...recibo,
      anexo: file,
    });
  }

  return (
    <div className="alterarcadastrorecibo">
      <main className="main-alterarcadastrorecibo">
        <header className="header-alterarcadastrorecibo">
          <h2 className="h2-alterarcadastrorecibo">Enviar Recibo</h2>
        </header>
        <section>
          <div className="form-alterarcadastrorecibo">
            <div className="floatingInput">
              <input
                type="text"
                className="floatingInput__control"
                placeholder="Data do recibo"
                name="data_recibo"
                value={recibo.data_recibo || ""}
                onChange={mascaraDataRecibo}
              />
              <label className="floatingInput__label">Data do recibo</label>
            </div>
            <div className="floatingInput">
              <input
                type="file"
                className="floatingInput__control"
                name="anexo"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <button
                className="bnt-page-cadastrorecibo"
                onClick={atualizaarquivo}
              >
                enviar
              </button>
              <button
                className="bnt-cadastrorecibo-abandonar"
                onClick={() => navigate(-1)}
              >
                abandonar
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
