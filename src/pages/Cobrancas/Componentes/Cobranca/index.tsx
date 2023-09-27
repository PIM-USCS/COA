import { MagnifyingGlass, PencilSimple, Trash } from "phosphor-react";
import "./styles.css";
import * as api from "../../../../services/api";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import { CobrancaProps } from "../../../../@types/Cobranca";
import { useCobranca } from "../../../../hooks/useCobranca";
import { useEffect, useState } from "react";
import { EmpresaProps } from "../../../../@types/Client";
interface CadastroProps {
  cobranca: CobrancaProps;
}

export function Cobranca({ cobranca }: CadastroProps) {
  const { idCobranca, setIdCobranca } = useCobranca();
  const [empresa, setEmpresa] = useState<EmpresaProps>({} as EmpresaProps);
  const navigate = useNavigate();

  const consultaEmpresa = async () => {
    if (!cobranca.id_empresa) {
      return;
    }
    const { data } = await api.getEmpresaByID(cobranca.id_empresa);

    setEmpresa((prevState) => {
      return {
        ...prevState,
        nome: data.nome,
      };
    });
  };

  useEffect(() => {
    consultaEmpresa();
  }, []);

  function consultaCobranca() {
    setIdCobranca(cobranca.id);

    if (!idCobranca) {
      return;
    }
  }
  // async function excluirCobranca() {
  //   setIdCobranca(cobranca.id);

  //   if (!idCobranca) {
  //     return;
  //   }
  //   Swal.fire({
  //     title: "Tem certeza que deseja deletar esta cobranca?",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     cancelButtonText: "Não",
  //     confirmButtonText: "Sim, desejo deletar!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       api.deleteCobranca(idCobranca);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Processo concluido!",
  //         text: "Cobranca deletado com sucesso!",
  //         confirmButtonText: "OK",
  //         preConfirm: () => {
  //           window.location.reload();
  //         },
  //       });
  //     }
  //   });
  // }

  // function alterarCobranca() {
  //   setIdCobranca(cobranca.id);

  //   if (!idCobranca) {
  //     return;
  //   }
  //   navigate("/alterar-cadastro-cobranca");
  // }

  // function consultarCobranca() {
  //   setIdCobranca(cobranca.id);
  //   navigate("/consultar-cobranca");
  // }

  return (
    <div className="lista">
      <div className="id">
        <p>{cobranca.id}</p>
      </div>
      <div className="empresa">
        <p>{empresa.nome}</p>
      </div>
      <div className="vencimento">
        <p>{cobranca.vencimento_cobranca}</p>
      </div>
      <div className="valor">
        <p>{cobranca.valor}</p>
      </div>
      <div className="status">
        <p>{cobranca.status}</p>
      </div>
      <div className="alterar-cobrancas">
        <button>
          <PencilSimple size={24} />
        </button>
      </div>
      <div className="excluir-cobrancas">
        <button>
          <Trash size={24} />
        </button>
      </div>
      <div className="consultar-cobrancas">
        <NavLink to="/consulta-cobrancas" style={{ all: "unset" }}>
          <button onClick={consultaCobranca}>
            <MagnifyingGlass size={24} />
          </button>
        </NavLink>
      </div>
    </div>
  );
}
