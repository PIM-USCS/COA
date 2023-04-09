import xhr from "./xhr";
import { AxiosPromise } from "axios";
import { ClienteProps, EmpresaPropsViaCep } from "../@types/Client";
// import { UsuarioProps } from "../@types/Usuario";
import { EmpresaListaProps } from "../pages/Clientes";
import { ColaboradorListaProps, ColaboradorProps } from "../@types/Colaborador";

/*EMPRESA*/

const getEmpresa = (): AxiosPromise<EmpresaListaProps[]> =>
  xhr.get(`empresas/`);

const getClientByCpf = (cpf: string): AxiosPromise<ClienteProps> =>
  xhr.get(`clientes/${cpf}`);

const getClientByCNPJ = (cnpj: string): AxiosPromise<ClienteProps> =>
  xhr.get(`clientes/${cnpj}`);

const getClientByID = (id: string): AxiosPromise<ClienteProps> =>
  xhr.get(`clientes/${id}`);

const postCreateCliente = (params: ClienteProps): AxiosPromise<ClienteProps> =>
  xhr.post(`clientes/`, params);

const deleteEmpresa = (id: string) => xhr.delete(`empresas/${id}`);

/*EMPRESA*/

/*COLABORADOR*/

const getColaborador = (): AxiosPromise<ColaboradorListaProps[]> =>
  xhr.get(`colaborador/`);

const deleteColaborador = (id: string) => xhr.delete(`colaborador/${id}`);

const postCreateColaborador = (
  params: ColaboradorListaProps
): AxiosPromise<ColaboradorProps> => xhr.post(`colaborador/`, params);

/*COLABORADOR*/

/*USUARIO*/
// const getUsuario = (nome: string , senha: string): AxiosPromise<UsuarioProps> =>
//   xhr.get(`usuarios/${}`)
/*USUARIO*/

/*UTILITÁRIOS*/

const viaCep = (cep: string): AxiosPromise<EmpresaPropsViaCep> =>
  xhr.get(`https://viacep.com.br/ws/${cep}/json/`);

/*UTILITÁRIOS*/

export {
  getClientByCpf,
  getClientByCNPJ,
  getClientByID,
  postCreateCliente,
  viaCep,
  getEmpresa,
  deleteEmpresa,
  getColaborador,
  deleteColaborador,
  postCreateColaborador,
};
