/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useEmpresa } from "../../hooks/useEmpresa";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { ClienteProps } from "../../@types/Client";
import * as api from "../../services/api";
import { ColaboradorProps } from "../../@types/Colaborador";
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
  id_colaborador: string;
}

export function ConsultaCliente() {
  const { idEmpresa, idCliente } = useEmpresa();
  const [empresa, setEmpresa] = useState<EmpresaProps>({} as EmpresaProps);
  const [cliente, setCliente] = useState<ClienteProps>({} as ClienteProps);
  const [colaborador, setColaborador] = useState<ColaboradorProps>(
    {} as ColaboradorProps
  );

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
        tipo_cliente: data.tipo_cliente,
        id_colaborador: data.id_colaborador,
      };
    });

    await ConsultaColaborador(data.id_colaborador);
  };

  useEffect(() => {
    ConsultaEmpresa();
  }, [idEmpresa]);

  const ConsultaCliente = async () => {
    if (!idCliente) {
      return;
    }
    const { data } = await api.getClienteByEmpresa(idCliente);

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

  const ConsultaColaborador = async (colaboradorId: string) => {
    const { data } = await api.getColaboradorByID(colaboradorId);

    setColaborador((prevState) => {
      return {
        ...prevState,
        id: data.id,
        nome: data.nome,
      };
    });
  };

  return (
    <div className="alterarcadastrocliente">
      <main className="main-alterarcadastrarcliente">
        <header className="header-alterarcadcliente">
          <h1>Consulta Cliente</h1>
        </header>

        <section className="formulario-empresa">
          <h2>Empresa</h2>
          <br />
          <hr />
          <br />
          <div className="tela-empresa-tipo-pessoa">
            <div className="tela-empresa-div-tipo-pessoa">
              <input
                type="radio"
                name="tipo-pessoa"
                className="tela-empresa-input-tipo-pessoa"
                value="PF"
                checked={empresa.tipo_cliente === "PF"}
                readOnly
              />
              <label
                htmlFor="tipo-pessoa"
                className="tela-empresa-label-tipo-pessoa">
                Pessoa fisica
              </label>
            </div>
            <div className="tela-empresa-div-tipo-pessoa">
              <input
                type="radio"
                name="tipo-pessoa"
                className="tela-empresa-input-tipo-pessoa"
                value="PJ"
                checked={empresa.tipo_cliente === "PJ"}
                readOnly
              />
              <label
                htmlFor="tipo-pessoa"
                className="tela-empresa-label-tipo-pessoa">
                Pessoa juridica
              </label>
            </div>
          </div>

          <div className="floatingInput">
            <input
              className="floatingInput__control ID"
              placeholder="Codigo da Empresa"
              name="nome"
              defaultValue={idEmpresa || ""}
              readOnly
            />
            <label className="floatingInput__label">Codigo da Empresa</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Razão social"
              name="nome"
              defaultValue={empresa.nome || ""}
              readOnly
            />
            <label className="floatingInput__label">Razão social</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="CNPJ/CPF"
              name={empresa.tipo_cliente === "PF" ? "cpf" : "cnpj"}
              defaultValue={
                empresa.tipo_cliente === "PF" ? empresa.cpf : empresa.cnpj
              }
              readOnly
            />
            <label className="floatingInput__label">CNPJ/CPF</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="CEP"
              name="cep"
              defaultValue={empresa.cep || ""}
              readOnly
            />
            <label className="floatingInput__label">CEP</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Rua"
              name="rua"
              defaultValue={empresa.rua || ""}
              readOnly
            />
            <label className="floatingInput__label">Rua</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Cidade"
              name="cidade"
              defaultValue={empresa.cidade || ""}
              readOnly
            />
            <label className="floatingInput__label">Cidade</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="UF"
              name="uf"
              defaultValue={empresa.uf || ""}
              readOnly
            />
            <label className="floatingInput__label">UF</label>
          </div>
          <div className="floatingInput">
            <input
              type="Bairro"
              className="floatingInput__control"
              placeholder="Bairro"
              name="bairro"
              defaultValue={empresa.bairro || ""}
              readOnly
            />
            <label className="floatingInput__label">Bairro</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Numero"
              name="numero"
              defaultValue={empresa.numero || ""}
              readOnly
            />
            <label className="floatingInput__label">Numero</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Complemento"
              name="complemento"
              defaultValue={empresa.complemento || ""}
              readOnly
            />
            <label className="floatingInput__label">Complemento</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Inscrição Estadual"
              name="ie"
              defaultValue={empresa.ie || ""}
              readOnly
            />
            <label className="floatingInput__label">Inscrição Estadual</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="ID contador responsavel"
              name="id"
              defaultValue={colaborador.id || ""}
              readOnly
            />
            <label className="floatingInput__label">
              ID contador responsavel
            </label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Contador responsavel"
              defaultValue={colaborador.nome || ""}
              readOnly
            />
            <label className="floatingInput__label">Contador responsavel</label>
          </div>
        </section>
        <section className="formulario-contato">
          <h2>Cliente</h2>
          <br />
          <hr />
          <br />
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="CPF"
              defaultValue={cliente.cpf || ""}
              readOnly
            />
            <label className="floatingInput__label">CPF</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Nome"
              defaultValue={cliente.nome || ""}
              readOnly
            />
            <label className="floatingInput__label">Nome</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="RG"
              defaultValue={cliente.rg || ""}
              readOnly
            />
            <label className="floatingInput__label">RG</label>
          </div>
          <div className="floatingInput">
            <input
              type="tel"
              className="floatingInput__control"
              placeholder="Telefone"
              defaultValue={cliente.telefone || ""}
              readOnly
            />
            <label className="floatingInput__label">Telefone</label>
          </div>
          <div className="floatingInput">
            <input
              type="email"
              className="floatingInput__control"
              placeholder="Email"
              defaultValue={cliente.email || ""}
              readOnly
            />
            <label className="floatingInput__label">Email</label>
          </div>
        </section>
        <section className="formulario-btn">
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
    </div>
  );
}
