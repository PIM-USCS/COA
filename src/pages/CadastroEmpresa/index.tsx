import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as api from "../../services/api";
import Swal from "sweetalert2";
import { ClienteProps, EmpresaProps } from "../../@types/Client";
import { UsuarioProps } from "../../@types/Usuario";
import { Eye, EyeSlash } from "phosphor-react";
import { ColaboradorProps } from "../../@types/Colaborador";
import maskTelefone from "../../utils/maskTelefone";
import formatarDocumento from "../../utils/maskCNPJCPF";

export function CadastroCliente() {
  const [empresa, setEmpresa] = useState<EmpresaProps>({} as EmpresaProps);
  const [cliente, setCliente] = useState<ClienteProps>({} as ClienteProps);
  const [usuario, setUsuario] = useState<UsuarioProps>({} as UsuarioProps);
  const [colaborador, setColaborador] = useState<ColaboradorProps>(
    {} as ColaboradorProps
  );
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [visualizarSenha, setVisualizarSenha] = useState(false);
  const [visualizarConfirmarSenha, setVisualizarConfirmarSenha] =
    useState(false);

  const navigate = useNavigate();
  const validarEmailCliente = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(cliente.email)) {
      Swal.fire({
        icon: "warning",
        title: "O email digitado é invalido!",
      });
    }
  };
  const validarEmailUsuario = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(usuario.email)) {
      Swal.fire({
        icon: "warning",
        title: "O email digitado é invalido!",
      });
    }
  };
  const mascaraTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, valorFormatado } = maskTelefone(e);

    setCliente({
      ...cliente,
      [name]: valorFormatado,
    });
  };

  const mascaraCNPJCPFEmpresa = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const valorFormatado = formatarDocumento(value);

    setEmpresa({
      ...empresa,
      [name]: valorFormatado,
    });
  };
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
  async function consultaEmpresa() {
    if (empresa.tipo_cliente === "PF") {
      const { data } = await api.getClientByCpf(empresa.cpf);
      if (data) {
        Swal.fire({
          icon: "info",
          title: "CPF informado já está cadastrado!",
        });
      }
    }

    if (empresa.tipo_cliente === "PJ") {
      const { data } = await api.getClientByCNPJ(empresa.cnpj);

      if (data) {
        Swal.fire({
          icon: "info",
          title: "CNPJ informado já está cadastrado!",
        });
      }
    }
  }

  async function consultaCliente() {
    if (cliente.cpf) {
      try {
        const { data } = await api.getClienteByCPF(cliente.cpf);

        setCliente({
          ...cliente,
          email: data.email,
          nome: data.nome,
          rg: data.rg,
          telefone: data.telefone,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
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
  async function finalizarCadastro() {
    if (!empresa.tipo_cliente) {
      Swal.fire({
        icon: "warning",
        title: "Selecione o tipo de pessoa!",
      });
      return;
    }
    try {
      const params = {
        ...empresa,
        id_colaborador: colaborador.id,
      };
      const responseEmpresa = await api.postCreateEmpresa(params);
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

  async function consultaColaboradorByID() {
    try {
      const { data } = await api.getColaboradorByID(colaborador.id);
      setColaborador({
        ...colaborador,
        nome: data.nome,
        telefone: data.telefone,
      });
      await api.getColaboradorByID(colaborador.id);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Não localizamos o colaborador com este ID!",
        text: "Gostaria de cadastrar?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Não",
        confirmButtonText: "Sim",
        preConfirm: () => {
          navigate("/cadastro-colaborador");
        },
      });
    }
  }

  return (
    <div className="tela-empresa-cadastrocliente">
      <main className="tela-empresa-main-cadastrarcliente">
        <header className="tela-empresa-header-cadcliente">
          <h1>Cadastro Empresa</h1>
        </header>

        <section className="tela-empresa-formulario-empresa">
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
                onChange={() => setEmpresa({ ...empresa, tipo_cliente: "PF" })}
              />
              <label
                htmlFor="tipo-pessoa"
                className="tela-empresa-label-tipo-pessoa"
              >
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
                onChange={() => setEmpresa({ ...empresa, tipo_cliente: "PJ" })}
              />
              <label
                htmlFor="tipo-pessoa"
                className="tela-empresa-label-tipo-pessoa"
              >
                Pessoa juridica
              </label>
            </div>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
              placeholder="CNPJ/CPF"
              name={empresa.tipo_cliente === "PF" ? "cpf" : "cnpj"}
              value={empresa.tipo_cliente === "PF" ? empresa.cpf : empresa.cnpj}
              onChange={mascaraCNPJCPFEmpresa}
              onBlur={consultaEmpresa}
            />
            <label className="tela-empresa-floatingInput__label">
              CNPJ/CPF
            </label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
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
            <label className="tela-empresa-floatingInput__label">
              Inscrição Estadual
            </label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
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

            <label className="tela-empresa-floatingInput__label">
              Razão social
            </label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
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
            <label className="tela-empresa-floatingInput__label">CEP</label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
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
            <label className="tela-empresa-floatingInput__label">Rua</label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
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
            <label className="tela-empresa-floatingInput__label">Cidade</label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
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
            <label className="tela-empresa-floatingInput__label">UF</label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="Bairro"
              className="tela-empresa-floatingInput__control"
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
            <label className="tela-empresa-floatingInput__label">Bairro</label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
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
            <label className="tela-empresa-floatingInput__label">Numero</label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
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
            <label className="tela-empresa-floatingInput__label">
              Complemento
            </label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
              placeholder="ID contador responsavel"
              name="id"
              value={colaborador.id || ""}
              onChange={(e) =>
                setColaborador({
                  ...colaborador,
                  [e.target.name]: e.target.value,
                })
              }
              onBlur={consultaColaboradorByID}
            />
            <label className="tela-empresa-floatingInput__label">
              ID contador responsavel
            </label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
              placeholder="Contador responsavel"
              value={colaborador.nome || ""}
              readOnly
            />
            <label className="tela-empresa-floatingInput__label">
              Contador responsavel
            </label>
          </div>
        </section>
        <section className="tela-empresa-formulario-contato">
          <h2>Cliente</h2>
          <br />
          <hr />
          <br />
          <div className="tela-empresa-floatingInput">
            {" "}
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
              placeholder="CPF CLIENTE"
              name="cpf"
              value={cliente.cpf || ""}
              onChange={(e) =>
                setCliente({
                  ...cliente,
                  [e.target.name]: e.target.value,
                })
              }
              onBlur={consultaCliente}
            />
            <label className="tela-empresa-floatingInput__label">CPF</label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
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
            <label className="tela-empresa-floatingInput__label">Nome</label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="text"
              className="tela-empresa-floatingInput__control"
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
            <label className="tela-empresa-floatingInput__label">RG</label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="tel"
              className="tela-empresa-floatingInput__control"
              placeholder="Telefone"
              name="telefone"
              value={cliente.telefone || ""}
              onChange={mascaraTelefone}
            />
            <label className="tela-empresa-floatingInput__label">
              Telefone
            </label>
          </div>
          <div className="tela-empresa-floatingInput">
            <input
              type="email"
              className="tela-empresa-floatingInput__control"
              placeholder="Email"
              name="email"
              value={cliente.email || ""}
              onChange={(e) =>
                setCliente({
                  ...cliente,
                  [e.target.name]: e.target.value,
                })
              }
              onBlur={validarEmailCliente}
            />
            <label className="tela-empresa-floatingInput__label">Email</label>
          </div>
        </section>
        <section className="tela-empresa-formulario-login">
          <h2>Login</h2>
          <br />
          <hr />
          <br />
          <div className="tela-empresa-floatingInput">
            <input
              type="email"
              className="tela-empresa-floatingInput__control"
              placeholder="E-mail de login"
              name="email"
              value={usuario.email || ""}
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  [e.target.name]: e.target.value,
                })
              }
              onBlur={validarEmailUsuario}
            />
            <label className="tela-empresa-floatingInput__label">Email</label>
          </div>
          <div className="tela-empresa-floatingInput">
            <button
              className="tela-empresa-esconder_senha"
              onClick={esconderSenha}
            >
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
              type={visualizarSenha ? "text" : "password"}
              className="tela-empresa-floatingInput__control"
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
            <label className="tela-empresa-floatingInput__label">Senha</label>
          </div>
          <div className="tela-empresa-floatingInput">
            <button
              className="tela-empresa-esconder_senha"
              onClick={esconderSenhaConfirmar}
            >
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
              className="tela-empresa-floatingInput__control"
              placeholder="Senha"
              name="senha"
              value={confirmarSenha || ""}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <label className="tela-empresa-floatingInput__label">
              Confirmar senha
            </label>
          </div>
        </section>
        <section className="tela-empresa-formulario-btn">
          <div className="tela-empresa-btn">
            <button
              className="tela-empresa-bnt-cadastrocliente"
              onClick={finalizarCadastro}
            >
              Cadastrar
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
