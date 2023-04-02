import "./styles.css";
import Logo from "../../img/COA linha/COA/favicon_1000x1000 recortada.png";
import { NavLink } from "react-router-dom";

export function CadastroCliente() {
  return (
    <body className="cadastrocliente">
      <main className="main-cadastrarcliente">
        <header className="header-cadcliente">
          <h1>Cadastro Cliente</h1>          
        </header>
        <form className="form-cadastrocliente">
          <section className="formulario-empresa">  {/* Empresa */}  
            <h2>Empresa</h2>
            <br/><hr/><br/>
            {/* <!-- floatingInput --> */}
            {/* <!-- floatingInput__control --> */}
            {/* <!-- floatingInput__label --> */}
            <div className="floatingInput"> {/*Razao social*/}
              <input
                type="text"
                /*id="razaosocial-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="Razão social"
              />
              <label className="floatingInput__label">Razão social</label>
            </div>
            <div className="floatingInput">{/*CNPJ/CPF*/}
              <input
                type="text"
                /*id="cnpj-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="CNPJ"
              />
              <label className="floatingInput__label">
                CNPJ
              </label>
            </div>
            <div className="floatingInput">{/*CEP*/}
              <input
                type="text"
                /*id="cep-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="CEP"
              />
              <label className="floatingInput__label">
                CEP
              </label>
            </div>
            <div className="floatingInput">{/*RUA*/}
              <input
                type="text"
                /*id="rua-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="Rua"
              />
              <label className="floatingInput__label">
                Rua
              </label>
            </div>
            <div className="floatingInput">{/*CIDADE*/}
              <input
                type="text"
                /*id="cidade-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="Cidade"
              />
              <label className="floatingInput__label">
                Cidade
              </label>
            </div>
            <div className="floatingInput">{/*UF*/}
              <input
                type="text"
                /*id="uf-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="UF"
              />
              <label className="floatingInput__label">
                UF
              </label>
            </div>
            <div className="floatingInput">{/*BAIRRO*/}
              <input
                type="Bairro"
                /*id="bairro-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="Bairro"
              />
              <label className="floatingInput__label">
                Bairro
              </label>
            </div>
            <div className="floatingInput">{/*NUMERO*/}
              <input
                type="text"
                /*id="numero-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="Numero"
              />
              <label className="floatingInput__label">
                Numero
              </label>
            </div>
            <div className="floatingInput">{/*COMPLEMENTO*/}
              <input
                type="text"
                /*id="complemento-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="Complemento"
              />
              <label className="floatingInput__label">
                Complemento
              </label>
            </div>
            <div className="floatingInput">{/*INSCRICAO ESTADUAL */}
              <input
                type="text"
                /*id="incricaoestadual-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="Inscrição Estadual"
              />
              <label className="floatingInput__label">
                Inscrição Estadual
              </label>
            </div>
            <div className="floatingInput">{/*Contador responsavel*/}
              <input
                type="text"
                /*id="email"*/
                className="floatingInput__control"
                placeholder="Contador responsavel"
              />
              <label className="floatingInput__label">Contador responsavel</label>
            </div>
          </section>
          <section className="formulario-contato">  {/* Contato */}
            <h2>Cliente</h2>
            <br/><hr/><br/>
            <div className="floatingInput"> {/* Nome */}
              <input
                type="text"
                /*id="nome-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="Nome"
              />
              <label className="floatingInput__label">Nome</label>
            </div>
            <div className="floatingInput"> {/*CPF*/}
              <input
                type="text"
                /*id="cpf-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="CPF"
              />
              <label className="floatingInput__label">CPF</label>
            </div>
            <div className="floatingInput"> {/*RG*/}
              <input
                type="text"
                /*id="rg-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="RG"
              />
              <label className="floatingInput__label">RG</label>
            </div>
            <div className="floatingInput"> {/* Telefone */}
              <input
                type="tel"
                /*id="telefone-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="Telefone"
              />
              <label className="floatingInput__label">Telefone</label>
            </div>
            <div className="floatingInput">{/*Email-de contato*/}
            <input
                type="email"
                /*id="email-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="Email"
              />
              <label className="floatingInput__label">Email</label>
            </div>            
          </section>
          <section className="formulario-login">    {/* Login */}
            <h2>Login</h2>
            <br/><hr/><br/>
            <div className="floatingInput">{/*Email-login*/}
              <input                
                type="email"
                /*id="email-cadastrocliente"*/
                className="floatingInput__control"
                placeholder="E-mail de login"
              />
              <label className="floatingInput__label">E-mail de login</label>
            </div>
            <div className="floatingInput">{/*Senha*/}
              <input
                type="password"
                id="senha-cadastrocliente"
                className="floatingInput__control"
                placeholder="Senha"
              />
              <label className="floatingInput__label">Senha</label>
            </div>
          </section>
          <section className="formulario-btn">      {/* Botão Salvar */}
            <div className="btn">
              <NavLink to="/Home" className="input-bnt-cadastrocliente">
                <button type="submit" className="bnt-cadastrocliente">
                  Salvar
                </button>
              </NavLink>               
            </div>
          </section>
        </form>
      </main>
    </body>
  );
}
