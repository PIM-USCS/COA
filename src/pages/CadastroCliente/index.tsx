import "./styles.css";
import Logo from "../../img/COA linha/COA/favicon_1000x1000 recortada.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as api from "../../services/api";
import Swal from "sweetalert2";

export interface EmpresaProps {
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

export function CadastroCliente() {
  const [empresa, setEmpresa] = useState<EmpresaProps>({} as EmpresaProps);
  const [valorPessoa, setvalorPessoa] = useState("");
  const navigate = useNavigate();

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setvalorPessoa(value);
    console.log(`Valor selecionado: ${value}`);
  }

  async function consultaCliente() {
    if (valorPessoa === "PF") {
      const { data } = await api.getClientByCpf(empresa.cpf);
      if (data) {
        Swal.fire({
          icon: "error",
          title: "CPF informado já está cadastrado!",
        });
      }
    }

    if (valorPessoa === "PJ") {
      const { data } = await api.getClientByCNPJ(empresa.cnpj);

      if (data) {
        Swal.fire({
          icon: "error",
          title: "CNPJ informado já está cadastrado!",
        });
      }
    }
  }

  const ConsultaCEP = async (event: any) => {
    const cep = event.target.value;

    if (cep.length < 8) {
      Swal.fire({
        icon: "error",
        title: "O CEP não pode ser menor que 8 caracteres",
        color: "gray",
        background: "black",
      });
      return;
    }

    if (cep.length > 8) {
      Swal.fire({
        icon: "error",
        title: "O CEP não pode ser maior que 8 caracteres",
        color: "gray",
        background: "black",
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
      console.log(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "O CEP digitado não foi localizado!",
        color: "gray",
        background: "black",
      });
    }
  };

  function finalizarCadastro() {
    if (valorPessoa === "PF") {
      if (!empresa.cpf) {
        Swal.fire({
          icon: "error",
          title: "O campo do CPF é obrigatório!",
        });
      }
    }
    if (valorPessoa === "PJ") {
      if (!empresa.cnpj) {
        Swal.fire({
          icon: "error",
          title: "O campo do CNPJ é obrigatório!",
        });
      }
    }

    if (!empresa.cep) {
      Swal.fire({
        icon: "error",
        title: "O campo do CEP é obrigatório!",
      });
    }

    if (!empresa.rua) {
      Swal.fire({
        icon: "error",
        title: "O campo Rua é obrigatório!",
      });
    }

    if (!empresa.cidade) {
      Swal.fire({
        icon: "error",
        title: "O campo Cidade é obrigatório!",
      });
    }

    if (!empresa.uf) {
      Swal.fire({
        icon: "error",
        title: "O campo UF é obrigatório!",
      });
    }

    if (!empresa.bairro) {
      Swal.fire({
        icon: "error",
        title: "O campo Bairro é obrigatório!",
      });
    } else {
      cadastrarCliente();
      Swal.fire({
        icon: "success",
        title: "Empresa cadastrada com sucesso!",
        confirmButtonText: "OK",
        preConfirm: () => {
          navigate(-2);
        },
      });
    }
  }

  async function cadastrarCliente() {
    await api.postCreateCliente(empresa);
  }

  return (
    <body className="cadastrocliente">
      <main className="main-cadastrarcliente">
        <header className="header-cadcliente">
          <h1>Cadastro Cliente</h1>
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
          <select
            name="mySelect"
            id="mySelect"
            className="option-pessoa"
            value={valorPessoa}
            onChange={handleSelectChange}
          >
            <option value="PF">Pessoa Física</option>
            <option value="PJ">Pessoa Jurídica</option>
          </select>
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
              onBlur={consultaCliente}
            />
            <label className="floatingInput__label">CNPJ/CPF</label>
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
          <div className="floatingInput">
            {/*CEP*/}
            <input
              type="text"
              /*id="cep-cadastrocliente"*/
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
              /*id="rua-cadastrocliente"*/
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
              /*id="cidade-cadastrocliente"*/
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
              /*id="uf-cadastrocliente"*/
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
              /*id="bairro-cadastrocliente"*/
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
              /*id="complemento-cadastrocliente"*/
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
              /*id="incricaoestadual-cadastrocliente"*/
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
        <section className="formulario-login">
          {" "}
          {/* Login */}
          <h2>Login</h2>
          <br />
          <hr />
          <br />
          <div className="floatingInput">
            {/*Email-login*/}
            <input
              type="email"
              /*id="email-cadastrocliente"*/
              className="floatingInput__control"
              placeholder="E-mail de login"
            />
            <label className="floatingInput__label">Login</label>
          </div>
          <div className="floatingInput">
            {/*Senha*/}
            <input
              type="password"
              id="senha-cadastrocliente"
              className="floatingInput__control"
              placeholder="Senha"
            />
            <label className="floatingInput__label">Senha</label>
          </div>
        </section>
        <section className="formulario-btn">
          {" "}
          {/* Botão Salvar */}
          <div className="btn">
            <button className="bnt-cadastrocliente" onClick={finalizarCadastro}>
              Cadastrar
            </button>
          </div>
        </section>
      </main>
    </body>
  );
}
