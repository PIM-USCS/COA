import "./styles.css";
import { Chart } from "./componentes/graficosPizza";
import {
  Buildings,
  FileSearch,
  MagnifyingGlass,
  User,
  UserCircle,
} from "phosphor-react";
import { Linha } from "./componentes/graficosLinhas";
import { Barra } from "./componentes/graficobarra";
import { useEffect, useState } from "react";
import * as api from "../../services/api";
import { ColaboradorListaProps } from "../../@types/Colaborador";
import { EmpresaListaProps } from "../Empresas";
import { ClienteProps, EmpresaProps } from "../../@types/Client";
import { CobrancaProps } from "../../@types/Cobranca";
import { Header } from "../../Components/Header";
import Swal from "sweetalert2";
export function Dashboard() {
  const [cobrancas, setCobrancas] = useState<CobrancaProps[]>([]);
  const [colaborador, setColaborador] = useState<ColaboradorListaProps[]>([]);
  const quantidadeColaboradores = colaborador.length;
  const [empresas, setEmpresas] = useState<EmpresaListaProps[]>([]);
  const quantidadeEmpresas = empresas.length;
  const [clientes, setClientes] = useState<ClienteProps[]>([]);
  const quantidadeClientes = clientes.length;
  const cobrancasVencidas = cobrancas.filter(
    (cobranca) => cobranca.status === "Vencida"
  );
  const cobrancasPagas = cobrancas.filter(
    (cobranca) => cobranca.status === "Pago"
  );
  const cobrancasAberto = cobrancas.filter(
    (cobranca) => cobranca.status === "Em aberto"
  );

  const totalVencido = cobrancasVencidas.reduce((total, cobranca) => {
    const valor =
      cobranca.valor &&
      parseFloat(
        cobranca.valor.replace("R$", "").replace(".", "").replace(",", ".")
      );
    return total + (valor || 0);
  }, 0);

  const totalPago = cobrancasPagas.reduce((total, cobranca) => {
    const valor =
      cobranca.valor &&
      parseFloat(
        cobranca.valor.replace("R$", "").replace(".", "").replace(",", ".")
      );
    return total + (valor || 0);
  }, 0);

  const totalAberto = cobrancasAberto.reduce((total, cobranca) => {
    const valor =
      cobranca.valor &&
      parseFloat(
        cobranca.valor.replace("R$", "").replace(".", "").replace(",", ".")
      );
    return total + (valor || 0);
  }, 0);

  const totaisMesAberto = Array.from({ length: 12 }, () => 0);
  cobrancasAberto.forEach((cobranca) => {
    const valor =
      cobranca.valor &&
      parseFloat(
        cobranca.valor.replace("R$", "").replace(".", "").replace(",", ".")
      );

    const dataEmissaoString = cobranca.emissao_cobranca;
    if (dataEmissaoString) {
      const [dia, mes, ano] = dataEmissaoString.split("/").map(Number);
      const dataEmissao = new Date(ano, mes - 1, dia); // Note que subtraímos 1 do mês (0 a 11)

      const mesCobranca = dataEmissao.getMonth(); // Obtém o mês (0 a 11)

      totaisMesAberto[mesCobranca] += valor || 0;
    }
  });

  const totaisMesVencido = Array.from({ length: 12 }, () => 0);
  cobrancasVencidas.forEach((cobranca) => {
    const valor =
      cobranca.valor &&
      parseFloat(
        cobranca.valor.replace("R$", "").replace(".", "").replace(",", ".")
      );

    const dataEmissaoString = cobranca.emissao_cobranca;
    if (dataEmissaoString) {
      const [dia, mes, ano] = dataEmissaoString.split("/").map(Number);
      const dataEmissao = new Date(ano, mes - 1, dia); // Note que subtraímos 1 do mês (0 a 11)

      const mesCobranca = dataEmissao.getMonth(); // Obtém o mês (0 a 11)

      totaisMesVencido[mesCobranca] += valor || 0;
    }
  });

  const totaisMesPagos = Array.from({ length: 12 }, () => 0);
  cobrancasPagas.forEach((cobranca) => {
    const valor =
      cobranca.valor &&
      parseFloat(
        cobranca.valor.replace("R$", "").replace(".", "").replace(",", ".")
      );

    const dataEmissaoString = cobranca.emissao_cobranca;
    if (dataEmissaoString) {
      const [dia, mes, ano] = dataEmissaoString.split("/").map(Number);
      const dataEmissao = new Date(ano, mes - 1, dia); // Note que subtraímos 1 do mês (0 a 11)

      const mesCobranca = dataEmissao.getMonth(); // Obtém o mês (0 a 11)

      totaisMesPagos[mesCobranca] += valor || 0;
    }
  });
  const [empresaConsulta, setEmpresaConsulta] = useState<EmpresaProps>(
    {} as EmpresaProps
  );

  const getColaborador = async () => {
    try {
      const { data } = await api.getColaborador();

      setColaborador(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getColaborador();
  }, []);

  const getEmpresas = async () => {
    try {
      const { data } = await api.getEmpresa();

      setEmpresas(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmpresas();
  }, []);

  const getClientes = async () => {
    try {
      const { data } = await api.getClientes();

      setClientes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  const getGuiasByCliente = async () => {
    try {
      const response = await api.getGuiaByCliente(empresaConsulta.id);
      const dadosCobrancas = response.data;

      setCobrancas(dadosCobrancas);
      Swal.fire({
        icon: "success",
        title: "informações carregadas com sucesso!",
      });
    } catch (error) {
      Swal.fire({
        icon: "info",
        title: "Não foi localizar guias desta empresa!",
        text: "Verifique se a empresa existe ou se existem guias lançadas para esta empresa",
      });
    }
  };

  return (
    <>
      <div style={{ paddingBottom: "100px" }}>
        <Header />
      </div>
      <main className="tela-dash-body">
        <div className="div-03">
          <div className="minibox">
            <Buildings size={32} color="#1d7c23" />
            <p>
              Quantidade de empresas:{" "}
              {empresas.length === 0 ? 0 : quantidadeEmpresas}
            </p>
          </div>
          <div className="minibox">
            <User size={32} color="#1d7c23" />
            <p>
              Quantidade de clientes:{" "}
              {clientes.length === 0 ? 0 : quantidadeClientes}
            </p>
          </div>
          <div className="minibox">
            <UserCircle size={32} color="#1d7c23" />
            <p>
              Quantidade de colaboradores:{" "}
              {colaborador.length === 0 ? 0 : quantidadeColaboradores}
            </p>
          </div>
        </div>
        <div className="div-01">
          <h1 className="tela-dash-label">Buscar cliente</h1>
          <div className="tela-dash-divinput">
            <input
              type="text"
              className="tela-dash-input"
              name="id"
              value={empresaConsulta.id || ""}
              onChange={(e) =>
                setEmpresaConsulta({
                  ...empresaConsulta,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <button onClick={getGuiasByCliente}>
              <MagnifyingGlass size={32} color="#1d7c23" />
            </button>
          </div>
        </div>

        <div className="div-04">
          <div className="minibox">
            <h1 className="dashbord-h1">Guias vencidas</h1>
            <p>
              {totalVencido.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="dashbord-h1">
              Quantidade: {cobrancasVencidas.length}
            </p>
          </div>
        </div>
        <div className="div-06">
          <div className="minibox">
            <h1 className="dashbord-h2">Guias pagas</h1>
            <p>
              {totalPago.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="dashbord-h2">Quantidade: {cobrancasPagas.length} </p>
          </div>
        </div>
        <div className="div-08">
          <div className="minibox">
            <h1 className="dashbord-h3">Foco</h1>
            <Barra
              totalAberto={totaisMesAberto}
              totalPago={totaisMesPagos}
              totalVencido={totaisMesVencido}
            />
          </div>
        </div>

        <div className="div-07">
          <div className="minibox">
            <h1 className="dashbord-h3">Guias em Aberto</h1>
            <p>
              {totalAberto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="dashbord-h3">Quantidade: {cobrancasAberto.length} </p>
          </div>
        </div>

        <div className="div-12">
          <div className="minibox">
            <h1 className="dashbord-h3">proporçao de detalhe </h1>
            <Linha></Linha>
          </div>
        </div>
        <div className="div-14">
          <div className="minibox">
            <h1 className="dashbord-h3">Quantidade de guias </h1>
            <Chart
              cobrancasAberto={cobrancasAberto}
              cobrancasPagas={cobrancasPagas}
              cobrancasVencidas={cobrancasVencidas}
            ></Chart>
          </div>
        </div>

        <div className="div-11">
          <p>&copy; 2023 Dashboard Financeiro</p>
        </div>
      </main>
    </>
  );
}
