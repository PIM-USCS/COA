import "./styles.css";
import { Chart } from "./componentes/graficosPizza";
import { Buildings, FileSearch, User, UserCircle } from "phosphor-react";
import { Linha } from "./componentes/graficosLinhas";
import { Barra } from "./componentes/graficobarra";
import { useEffect, useState } from "react";
import * as api from "../../services/api";
import { ColaboradorListaProps } from "../../@types/Colaborador";
import { EmpresaListaProps } from "../Empresas";
import { ClienteProps } from "../../@types/Client";
export function Dashboard() {
  const [colaborador, setColaborador] = useState<ColaboradorListaProps[]>([]);
  const quantidadeColaboradores = colaborador.map((colab) => colab.id);
  const [empresas, setEmpresas] = useState<EmpresaListaProps[]>([]);
  const quantidadeEmpresas = empresas.map((empre) => empre.id);
  const [clientes, setClientes] = useState<ClienteProps[]>([]);
  const quantidadeClientes = clientes.map((cli) => cli.id);

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
  return (
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
        <input type="text" className="tela-dash-input" />
        <button>
          <FileSearch size={30} color="#1d7c23" />
        </button>
      </div>

      <div className="div-04">
        <div className="minibox">
          <h1 className="dashbord-h1">Guias vencidas</h1>
          <p>R$ 100.000,00</p>
          <p className="dashbord-h1">Quantidade : X</p>
        </div>
      </div>
      <div className="div-06">
        <div className="minibox">
          <h1 className="dashbord-h2">Guias pagas</h1>
          <p>R$ 100.000,00</p>
          <p className="dashbord-h2">Quantidade :X </p>
        </div>
      </div>
      <div className="div-08">
        <div className="minibox">
          <h1 className="dashbord-h3">Foco</h1>
          <Barra></Barra>
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
          <h1 className="dashbord-h3">Quantidade de exemplos </h1>
          <Chart></Chart>
        </div>
      </div>

      <div className="div-07">
        <div className="minibox">
          <h1 className="dashbord-h3">Guias em Aberto</h1>
          <p>R$ 100.000,00</p>
          <p className="dashbord-h3">Quantidade :X </p>
        </div>
      </div>

      <div className="div-11">
        <p>&copy; 2023 Dashboard Financeiro</p>
      </div>
    </main>
  );
}
