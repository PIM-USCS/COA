import "./styles.css";

export function Home() {
  return (
    <body>
      {/*  COMEÇO Barra de navegação */}
      <header className="header">
        <img src="/img/logo sem fundo.png" alt="logo" className="logo" />
        <input className="busca" type="source" placeholder="busca"></input>
        <nav className="nav">
          <div>
            <ul className="menu" />
            <li>
              <a href="#">Configs</a>
            </li>
            <li>
              <a href="#">opçoes</a>
            </li>
            {/*  precisa colocar um icone de user */}
            <li>
              <a href="#"> USER</a>
              <ul>
                <li>
                  <a href="#">OPÇOES</a>
                </li>
                <li>
                  <a href="#">MEU PERFIL</a>
                </li>
                <li>
                  <a href="#">DESLOGAR</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">notificaçao </a>
            </li>
          </div>
        </nav>
        {/*  FIM Barra de navegação  */}
      </header>
      {/*  COMEÇO Barra Lateral  */}
      <aside className="aside">
        <div className="blocousuario">
          <img src="" alt="" className="foto" />
          <h1 className="nomeusuario"> Usuario</h1>
          <h1 className="cargo"> Adiministrador</h1>
        </div>
        <div className="navlateral">
          <div className="menulateral">
            <a href="signup.html" className="menulateral">
              Cadastrar Colaborador
            </a>
            <a href="Cad.cliente.html" className="menulateral">
              Cadastrar cliente
            </a>
            <a href="ChangePass.html" className="menulateral">
              Alterar senha
            </a>
            <a href="UploadImg.html" className="menulateral">
              Enviar guias
            </a>
          </div>
        </div>
      </aside>
      {/*  FIM Barra Lateral  */}
      {/*  Dashbord article */}
      <article className="dashbord">
        {/*  Caixinhas financeiras  */}
        <section className="financeiras">
          <div className="boxfinanceiras"></div>
          <div className="boxfinanceiras"></div>
          <div className="boxfinanceiras"></div>
          <div className="boxfinanceiras"></div>
        </section>
        {/*  FIM Caixinhas financeiras  */}
        <section className="notasfiscais">
          {/* <Br></Br> */}
          <div className="validaçao">
            <div className="tabela">
              <table className="table">
                <tr className="titulotabela">
                  <td className="tdi">Marcaçao</td>
                  <td className="tdi">Codigo</td>
                  <td className="tdi">Cliente</td>
                  <td className="tdi">Valor</td>
                  <td className="tdi">Vencimento</td>
                  <td className="tdi">mes</td>
                  <td className="tdi">Status</td>
                  <td className="tdi">detalhes</td>
                </tr>
                <tr>
                  <td> 1 </td>
                  <td>1 </td>
                  <td>1 </td>
                  <td>1 </td>
                  <td>1 </td>
                  <td> 1</td>
                  <td>1 </td>
                  <td>1 </td>
                </tr>
                <tr>
                  <td> 1</td>
                  <td> 1</td>
                  <td> 1</td>
                  <td>1 </td>
                  <td> 1</td>
                  <td>1 </td>
                  <td>1 </td>
                  <td>1 </td>
                </tr>
              </table>
            </div>
          </div>
        </section>
        <section className="tarefas">
          <div className="boxtarefas"></div>
          <div className="boxtarefas"></div>
          <div className="boxtarefas"></div>
        </section>
      </article>
    </body>
  );
}
