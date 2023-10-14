import "./styles.css";
import{Chart} from "./componentes/graficosPizza"
import Logo from "../../img/logo sem fundo.png";
import { Alien, Buildings, FileSearch, User } from "phosphor-react";
import { Linha } from "./componentes/graficosLinhas";
import { Barra } from "./componentes/graficobarra";
export function Dashboard() {
  return (
    <main className="tela-dash-body">
      <div className="div-09"> LOGIN <p>Coloca a quelas infosmaçaos de usserkasdo</p>
      </div>
      <div className="div-01">
        <h1 className="tela-dash-label">Buscar cliente</h1>
        <input type="text" className="tela-dash-input" />
        <button>
         <FileSearch size={30} color="#1d7c23" />
       </button>
      </div>
      <div className="div-03">
        <div className="minibox">
        <User size={32} color="#1d7c23" />
        <p>Quantidade  de clientes ativos: 2</p>
        </div>
        <div className="minibox">
        <Alien size={32} color="#1d7c23" />
        <p>Quantidade  de empresas : 2</p>
        </div>
        <div className="minibox">
        <Buildings size={32} color="#1d7c23" />

        <p>Quantidade Clientes : 2</p>
        </div>
      </div>
      <div className="div-05">
      <img src={Logo} alt="Logo" className="logo-dashbord" />
        <h1>COA</h1>
      </div>
      <div className="div-04">
        <div className="minibox">
        <h1 className="dashbord-h1">Valor de Guias vencidas</h1>
        <p>R$ 100.000,00</p>
        <p className="dashbord-h1">Quantidade : X</p>
        </div>
      </div>
      <div className="div-06">
        <div className="minibox">
        <h1 className="dashbord-h2">Valor de Guias pagas</h1>
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

        <p >&copy; 2023 Dashboard Financeiro</p>
      </div>
    </main>
  );
}
