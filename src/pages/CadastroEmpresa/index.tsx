import "./styles.css";
// import Logo from "../../img/COA linha/COA/favicon_1000x1000 recortada.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as api from "../../services/api";
import Swal from "sweetalert2";
import { ClienteProps } from "../../@types/Client";
import { UsuarioProps } from "../../@types/Usuario";
import { Eye, EyeSlash } from "phosphor-react";

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
  const [usuario, setUsuario] = useState<UsuarioProps>({} as UsuarioProps);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [visualizarSenha, setVisualizarSenha] = useState(false);
  const [visualizarConfirmarSenha, setVisualizarConfirmarSenha] =
    useState(false);
  const [valorPessoa, setvalorPessoa] = useState("");
  const navigate = useNavigate();

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setEmpresa((prevEmpresa) => ({ ...prevEmpresa, tipo_cliente: value }));
    setvalorPessoa(value);
  }

  function esconderSenha() {
    if (visualizarSenha === false) {
      setVisualizarSenha(true);
    }
    if (visualizarSenha === true) {
      setVisualizarSenha(false);
    }
  }
  function esconderSenhaConfirmar() {
    if (visualizarConfirmarSenha === false) {
      setVisualizarConfirmarSenha(true);
    }
    if (visualizarConfirmarSenha === true) {
      setVisualizarConfirmarSenha(false);
    }
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
      await cadastrarUsuario(empresaId);
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
  async function cadastrarUsuario(empresaId: string) {
    const params = {
      ...usuario,
      tipo_usuario: "3",
      id_empresa: empresaId.toString(),
    };

    await api.postCreateUsuario(params);
  }

  return (
    <body className="cadastrocliente">
      <main className="main-cadastrarcliente">
        <header className="header-cadcliente">
          <h1>Cadastro Empresa</h1>
        </header>

        <section className="formulario-empresa">
          <h2>Empresa</h2>
          <br />
          <hr />
          <br />
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
              onBlur={consultaCliente}
            />
            <label className="floatingInput__label">CNPJ/CPF</label>
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
          <h2>Login</h2>
          <br />
          <hr />
          <br />
          <div className="floatingInput">
            <input
              type="email"
              className="floatingInput__control"
              placeholder="E-mail de login"
              name="email"
              value={usuario.email || ""}
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Login</label>
          </div>
          <div className="floatingInput">
            <button className="esconder_senha" onClick={esconderSenha}>
              <EyeSlash
                size={22}
                style={{ display: visualizarSenha ? "flex" : "none" }}
              />
              <Eye
                size={22}
                style={{ display: visualizarSenha ? "none" : "flex" }}
              />
            </button>
            <input
              id="senha-cadastrocliente"
              type={visualizarSenha ? "text" : "password"}
              className="floatingInput__control"
              placeholder="Senha"
              name="senha"
              value={usuario.senha || ""}
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="floatingInput__label">Senha</label>
          </div>
          <div className="floatingInput">
            <button className="esconder_senha" onClick={esconderSenhaConfirmar}>
              <EyeSlash
                size={22}
                style={{
                  display: visualizarConfirmarSenha ? "flex" : "none",
                }}
              />
              <Eye
                size={22}
                style={{
                  display: visualizarConfirmarSenha ? "none" : "flex",
                }}
              />
            </button>
            <input
              type={visualizarConfirmarSenha ? "text" : "password"}
              id="senha-cadastrocliente"
              className="floatingInput__control"
              placeholder="Senha"
              name="senha"
              value={confirmarSenha || ""}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <label className="floatingInput__label">Confirmar senha</label>
          </div>
        </section>
        <section className="formulario-btn">
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
