/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useEmpresa } from "../../hooks/useEmpresa";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles.css";

import * as api from "../../services/api";
import Swal from "sweetalert2";
import { ClienteProps } from "../../@types/Client";
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
  const { idEmpresa, idCliente } = useEmpresa();
  const [empresa, setEmpresa] = useState<EmpresaProps>({} as EmpresaProps);
  const [cliente, setCliente] = useState<ClienteProps>({} as ClienteProps);
  const navigate = useNavigate();

  async function alterarCadastro() {
    try {
      await alterarCliente();
      await alterarEmpresa();
    } catch (error) {
      console.log(error);
    } finally {
      Swal.fire({
        icon: "success",
        title: "Cadastro concluído com sucesso!",
        preConfirm: () => {
          navigate(-1);
        },
      });
    }
  }

  async function alterarEmpresa() {
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

  async function alterarCliente() {
    await api.postAtualizaCliente(idEmpresa, {
      nome: cliente.nome.toString(),
      cpf: cliente.cpf.toString(),
      email: cliente.email.toString(),
      rg: cliente.rg.toString(),
      telefone: cliente.telefone.toString(),
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

  const ConsultaCliente = async () => {
    if (!idCliente) {
      return;
    }
    const { data } = await api.getClienteByEmpresa(idCliente);

    setCliente({
      ...cliente,
      cpf: data.cpf,
      nome: data.nome,
      email: data.email,
      rg: data.rg,
      telefone: data.telefone,
    });
  };

  const ConsultaCEP = async (event: any) => {
    const cep = event.target.value;

    if (cep.length < 8) {
      Swal.fire({
        icon: "info",
        title: "O CEP não pode ser menor que 8 caracteres",
      });
      return;
    }

    if (cep.length > 8) {
      Swal.fire({
        icon: "info",
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
        icon: "info",
        title: "O CEP digitado não foi localizado!",
      });
    }
  };

  useEffect(() => {
    ConsultaCliente();
  }, [idCliente]);

  useEffect(() => {
    ConsultaEmpresa();
  }, [idEmpresa]);
  return (
    <body className="alterarcadastrocliente">
      <main className="main-alterarcadastrarcliente">
        <header className="header-alterarcadcliente">
          <h1>Alterar Dados Cliente</h1>
        </header>

        <section className="formulario-empresa">
          <h2>Empresa</h2>
          <br />
          <hr />
          <br />
          <div className="floatingInput">
            <input
              type="search"
              className="floatingInput__control ID"
              placeholder="Codigo da Empresa"
              name="nome"
              value={idEmpresa || ""}
            />
            <label className="floatingInput__label">Codigo da Empresa</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
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
          <div className="floatingInput">
            <input
              type="text"
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
            <input
              type="text"
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
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Contador responsavel"
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
              name="cpf"
              value={cliente.cpf || ""}
              onChange={(e) =>
                setCliente({
                  ...cliente,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">CPF</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="Nome"
              name="nome"
              value={cliente.nome || ""}
              onChange={(e) =>
                setCliente({
                  ...cliente,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Nome</label>
          </div>
          <div className="floatingInput">
            <input
              type="text"
              className="floatingInput__control"
              placeholder="RG"
              name="rg"
              value={cliente.rg || ""}
              onChange={(e) =>
                setCliente({
                  ...cliente,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">RG</label>
          </div>
          <div className="floatingInput">
            <input
              type="tel"
              className="floatingInput__control"
              placeholder="Telefone"
              name="telefone"
              value={cliente.telefone || ""}
              onChange={(e) =>
                setCliente({
                  ...cliente,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Telefone</label>
          </div>
          <div className="floatingInput">
            <input
              type="email"
              className="floatingInput__control"
              placeholder="Email"
              name="email"
              value={cliente.email || ""}
              onChange={(e) =>
                setCliente({
                  ...cliente,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Email</label>
          </div>
        </section>
        <section className="formulario-btn">
          <div className="btn">
            <button className="bnt-page-cadastrocliente" onClick={alterarCadastro}>
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
