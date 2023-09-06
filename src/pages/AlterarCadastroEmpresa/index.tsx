/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useEmpresa } from "../../hooks/useEmpresa";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles.css";

import * as api from "../../services/api";
import Swal from "sweetalert2";
interface EmpresaProps {
  id: string;
  cpf: string;
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

export function AlterarCadastroCliente() {
  const { idEmpresa } = useEmpresa();
  const [empresa, setEmpresa] = useState<EmpresaProps>({} as EmpresaProps);
  const navigate = useNavigate();

  async function alterarCliente() {
    await api.postAtualizaEmpresa(idEmpresa, {
      nome: empresa.nome.toString(),
      cep: empresa.cep.toString(),
      cidade: empresa.cidade.toString(),
      rua: empresa.rua.toString(),
      uf: empresa.uf.toString(),
      bairro: empresa.bairro.toString(),
      numero: empresa.numero.toString(),
      cpf: empresa.cpf.toString(),
      cnpj: empresa.cnpj.toString(),
      ie: empresa.ie.toString(),
      complemento: empresa.complemento.toString(),
    });
  }

  const ConsultaEmpresa = async () => {
    if (!idEmpresa) {
      return;
    }
    const { data } = await api.getEmpresaByID(idEmpresa);

    setEmpresa({
      ...empresa,
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
    });
  };

  useEffect(() => {
    ConsultaEmpresa();
  }, [idEmpresa]);

  const ConsultaCEP = async (event: any) => {
    const cep = event.target.value;

    if (cep.length < 8) {
      Swal.fire({
        icon: "error",
        title: "O CEP não pode ser menor que 8 caracteres",
      });
      return;
    }

    if (cep.length > 8) {
      Swal.fire({
        icon: "error",
        title: "O CEP não pode ser maior que 8 caracteres",
      });
      return;
    }

    try {
      const { data } = await api.viaCep(cep);

      setEmpresa({
        ...empresa,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "O CEP digitado não foi localizado!",
      });
    }
  };

  return (
    <body className="alterarcadastrocliente">
      <main className="main-alterarcadastrarcliente">
        <header className="header-alterarcadcliente">
          <h1>Alterar Dados Cliente</h1>
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
              type="search"
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
              onChange={(e) =>
                setEmpresa({
                  ...empresa,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Razão social</label>
          </div>
          {/*<select
              name="mySelect"
              id="mySelect"
              className="option-pessoa"
              value={valorPessoa}
              onChange={handleSelectChange}>
              <option value="PF">Pessoa Física</option>
              <option value="PJ">Pessoa Jurídica</option>
            </select>*/}
          <div className="floatingInput">
            {/*CNPJ/CPF*/}
            <input
              type="text"
              /*id="cnpj-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="CNPJ/CPF"
              name="cnpj"
              value={empresa.cnpj || ""}
              onChange={(e) =>
                setEmpresa({
                  ...empresa,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">CNPJ/CPF</label>
          </div>
          <div className="floatingInput">
            {/*CEP*/}
            <input
              type="text"
              className="floatingInput__control"
              placeholder="CEP"
              name="cep"
              value={empresa.cep || ""}
              onChange={(e) =>
                setEmpresa({
                  ...empresa,
                  [e.target.name]: e.target.value,
                })
              }
              onBlur={ConsultaCEP}
            />
            <label className="floatingInput__label">CEP</label>
          </div>
          <div className="floatingInput">
            {/*RUA*/}
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Rua"
              name="rua"
              value={empresa.rua || ""}
              onChange={(e) =>
                setEmpresa({
                  ...empresa,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Rua</label>
          </div>
          <div className="floatingInput">
            {/*CIDADE*/}
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Cidade"
              name="cidade"
              value={empresa.cidade || ""}
              onChange={(e) =>
                setEmpresa({
                  ...empresa,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Cidade</label>
          </div>
          <div className="floatingInput">
            {/*UF*/}
            <input
              type="text"
              className="floatingInput__control"
              placeholder="UF"
              name="uf"
              value={empresa.uf || ""}
              onChange={(e) =>
                setEmpresa({
                  ...empresa,
                  [e.target.name]: e.target.value,
                })
              }
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
              onChange={(e) =>
                setEmpresa({
                  ...empresa,
                  [e.target.name]: e.target.value,
                })
              }
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
              onChange={(e) =>
                setEmpresa({
                  ...empresa,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Numero</label>
          </div>
          <div className="floatingInput">
            {/*COMPLEMENTO*/}
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Complemento"
              name="complemento"
              value={empresa.complemento || ""}
              onChange={(e) =>
                setEmpresa({
                  ...empresa,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Complemento</label>
          </div>
          <div className="floatingInput">
            {/*INSCRICAO ESTADUAL */}
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Inscrição Estadual"
              name="ie"
              value={empresa.ie || ""}
              onChange={(e) =>
                setEmpresa({
                  ...empresa,
                  [e.target.name]: e.target.value,
                })
              }
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
            <button className="bnt-cadastrocliente" onClick={alterarCliente}>
              editar
            </button>
            <button
              className="bnt-cadastrocliente-abandonar"
              onClick={() => navigate(-1)}>
              abandonar alterações
            </button>
          </div>
        </section>
      </main>
    </body>
  );
}
