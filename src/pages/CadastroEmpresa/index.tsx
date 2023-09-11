import "./styles.css";
// import Logo from "../../img/COA linha/COA/favicon_1000x1000 recortada.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as api from "../../services/api";
import Swal from "sweetalert2";
import { ClienteProps } from "../../@types/Client";

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
  const [cliente, setCliente] = useState<ClienteProps>({} as ClienteProps);
  const [valorPessoa, setvalorPessoa] = useState("");
  const navigate = useNavigate();

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setEmpresa((prevEmpresa) => ({ ...prevEmpresa, tipo_cliente: value }));
    setvalorPessoa(value);
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

  async function finalizarCadastro() {
    try {
      const responseEmpresa = await api.postCreateEmpresa(empresa);
      const empresaId: string = responseEmpresa.data.id;

      setEmpresa({ ...empresa, id: empresaId });

      await cadastrarCliente(empresaId);
    } catch (error) {
      console.error(error);
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

  async function cadastrarCliente(empresaId: string) {
    await api.postCreateCliente(cliente, empresaId);
  }

  return (
    <body className="cadastrocliente">
      <main className="main-cadastrarcliente">
        <header className="header-cadcliente">
          <h1>Cadastro Empresa</h1>
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
            onChange={handleSelectChange}>
            <option value="">Selecione</option>
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
            {" "}
            {/*RG*/}
            <input
              type="text"
              /*id="rg-cadastrocliente"*/
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
            {" "}
            {/* Telefone */}
            <input
              type="tel"
              /*id="telefone-cadastrocliente"*/
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
            {/*Email-de contato*/}
            <input
              type="email"
              /*id="email-cadastrocliente"*/
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
          {/* CRIEI UM NOVO CAMPO DE CONFIRMAR SENHA ------ INICIOU  */}
          <div className="floatingInput">
            {/*Senha*/}
            <input
              type="password"
              id="senha-cadastrocliente"
              className="floatingInput__control"
              placeholder="Senha"
            />
            <label className="floatingInput__label">Confirmar senha</label>
          </div>
          {/* CRIEI UM NOVO CAMPO DE CONFIRMAR SENHA ------ FIM  */}
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
