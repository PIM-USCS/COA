/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useEmpresa } from "../../hooks/useEmpresa";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { ClienteProps } from "../../@types/Client";
import * as api from "../../services/api";
interface EmpresaProps {
  id: string;
  tipo_cliente: string;
  cpf: string;
  rg: string;
  regime: string;
  cnpj: string;
  ie: string;
  nome: string;
  cep: string;
  rua: string;
  cidade: string;
  uf: string;
  bairro: string;
  numero: string;
  complemento: string;
}

export function ConsultaCliente() {
  const { idEmpresa, idCliente } = useEmpresa();
  const [empresa, setEmpresa] = useState<EmpresaProps>({} as EmpresaProps);
  const [cliente, setCliente] = useState<ClienteProps>({} as ClienteProps);

  const ConsultaEmpresa = async () => {
    if (!idEmpresa) {
      return;
    }
    const { data } = await api.getEmpresaByID(idEmpresa);

    setEmpresa((prevState) => {
      return {
        ...prevState,
        cpf: data.cpf,
        bairro: data.bairro,
        cidade: data.cidade,
        rua: data.rua,
        numero: data.numero,
        uf: data.uf,
        nome: data.nome,
        complemento: data.complemento,
        cep: data.cep,
        cnpj: data.cnpj,
        ie: data.ie,
      };
    });
  };
  useEffect(() => {
    ConsultaEmpresa();
  }, [idEmpresa]);

  const ConsultaCliente = async () => {
    if (!idCliente) {
      return;
    }
    const { data } = await api.getClienteById(idCliente);

    setCliente((prevState) => {
      return {
        ...prevState,
        nome: data.nome,
        cpf: data.cpf,
        rg: data.rg,
        email: data.email,
        telefone: data.telefone,
      };
    });
  };
  useEffect(() => {
    ConsultaCliente();
  }, [idCliente]);
  return (
    <body className="alterarcadastrocliente">
      <main className="main-alterarcadastrarcliente">
        <header className="header-alterarcadcliente">
          <h1>Consulta Cliente</h1>
        </header>

        <section className="formulario-empresa">
          {" "}
          {/* Empresa */}
          <h2>Empresa</h2>
          <br />
          <hr />
          <br />
          {/* <!-- floatingInput --> */}
          {/* <!-- floatingInput__control --> */}
          {/* <!-- floatingInput__label --> */}
          <div className="floatingInput">
            {" "}
            {/*Razao social*/}
            <input
              /*id="razaosocial-cadastrocliente"*/
              className="floatingInput__control ID"
              placeholder="Codigo da Empresa"
              name="nome"
              value={idEmpresa || ""}
            />
            <label className="floatingInput__label">Codigo da Empresa</label>
          </div>
          <div className="floatingInput">
            {" "}
            {/*Razao social*/}
            <input
              type="text"
              /*id="razaosocial-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="Razão social"
              name="nome"
              value={empresa.nome || ""}
            />
            <label className="floatingInput__label">Razão social</label>
          </div>
          {/* <select>
              name="mySelect" id="mySelect" className="option-pessoa" value=
              {valorPessoa}
            </select> */}
          <div className="floatingInput">
            {/*CNPJ/CPF*/}
            <input
              type="text"
              /*id="cnpj-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="CNPJ/CPF"
              name="cnpj"
              value={empresa.cnpj || ""}
            />
            <label className="floatingInput__label">CNPJ/CPF</label>
          </div>
          <div className="floatingInput">
            {/*CEP*/}
            <input
              type="text"
              /*id="cep-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="CEP"
              name="cep"
              value={empresa.cep || ""}
            />
            <label className="floatingInput__label">CEP</label>
          </div>
          <div className="floatingInput">
            {/*RUA*/}
            <input
              type="text"
              /*id="rua-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="Rua"
              name="rua"
              value={empresa.rua || ""}
            />
            <label className="floatingInput__label">Rua</label>
          </div>
          <div className="floatingInput">
            {/*CIDADE*/}
            <input
              type="text"
              /*id="cidade-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="Cidade"
              name="cidade"
              value={empresa.cidade || ""}
            />
            <label className="floatingInput__label">Cidade</label>
          </div>
          <div className="floatingInput">
            {/*UF*/}
            <input
              type="text"
              /*id="uf-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="UF"
              name="uf"
              value={empresa.uf || ""}
            />
            <label className="floatingInput__label">UF</label>
          </div>
          <div className="floatingInput">
            {/*BAIRRO*/}
            <input
              type="Bairro"
              className="floatingInput__control"
              placeholder="Bairro"
              name="bairro"
              value={empresa.bairro || ""}
            />
            <label className="floatingInput__label">Bairro</label>
          </div>
          <div className="floatingInput">
            {/*NUMERO*/}
            <input
              type="text"
              /*id="numero-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="Numero"
              name="numero"
              value={empresa.numero || ""}
            />
            <label className="floatingInput__label">Numero</label>
          </div>
          <div className="floatingInput">
            {/*COMPLEMENTO*/}
            <input
              type="text"
              /*id="complemento-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="Complemento"
              name="complemento"
              value={empresa.complemento || ""}
            />
            <label className="floatingInput__label">Complemento</label>
          </div>
          <div className="floatingInput">
            {/*INSCRICAO ESTADUAL */}
            <input
              type="text"
              /*id="incricaoestadual-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="Inscrição Estadual"
              name="ie"
              value={empresa.ie || ""}
            />
            <label className="floatingInput__label">Inscrição Estadual</label>
          </div>
          <div className="floatingInput">
            {/*Contador responsavel*/}
            <input
              type="text"
              /*id="email"*/
              className="floatingInput__control"
              placeholder="Contador responsavel"
            />
            <label className="floatingInput__label">Contador responsavel</label>
          </div>
        </section>
        <section className="formulario-contato">
          {" "}
          {/* Contato */}
          <h2>Cliente</h2>
          <br />
          <hr />
          <br />
          <div className="floatingInput">
            {" "}
            {/*CPF*/}
            <input
              type="text"
              /*id="cpf-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="CPF"
            />
            <label className="floatingInput__label">CPF</label>
          </div>
          <div className="floatingInput">
            {" "}
            {/* Nome */}
            <input
              type="text"
              /*id="nome-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="Nome"
            />
            <label className="floatingInput__label">Nome</label>
          </div>
          <div className="floatingInput">
            {" "}
            {/*RG*/}
            <input
              type="text"
              /*id="rg-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="RG"
            />
            <label className="floatingInput__label">RG</label>
          </div>
          <div className="floatingInput">
            {" "}
            {/* Telefone */}
            <input
              type="tel"
              /*id="telefone-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="Telefone"
            />
            <label className="floatingInput__label">Telefone</label>
          </div>
          <div className="floatingInput">
            {/*Email-de contato*/}
            <input
              type="email"
              /*id="email-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="Email"
            />
            <label className="floatingInput__label">Email</label>
          </div>
        </section>
        <section className="formulario-btn">
          {" "}
          {/* Botão Salvar */}
          <div className="btn">
            <NavLink
              to="/empresas"
              className="input-bnt-cadastrocliente"
              style={{ textDecoration: "none" }}>
              <button className="bnt-cadastrocliente">Voltar</button>
            </NavLink>
          </div>
        </section>
      </main>
    </body>
  );
}
