import "./styles.css";
export function Dashboard() {
  return (
    <main className="tela-dash-main">
      <div className="tela-dash-cliente">
        <h1 className="tela-dash-label">Insira o cliente</h1>
        <input type="text" className="tela-dash-input" />
        <button>"-"</button>
      </div>

      <div className="tela-dash-div">
        <div className="tela-dash-cards">
          <h1>Valor de Guias em geral</h1>
          <p>R$ 100.000,00</p>
          <div className="tela-dash-bar-totals"></div>
        </div>
        <div className="tela-dash-cards">
          <h1>Valor de Guias vencidas</h1>
          <p>R$ 100.000,00</p>
          <div className="tela-dash-bar-vencidas"></div>
        </div>
        <div className="tela-dash-cards">
          <h1>Valor de Guias pagas</h1>
          <p>R$ 100.000,00</p>
          <div className="tela-dash-bar-pagas"></div>
        </div>
      </div>
    </main>
  );
}
