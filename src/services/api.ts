import xhr from "./xhr";
import { AxiosPromise } from "axios";
import {
  AtuEmpresa,
  ClienteProps,
  EmpresaProps,
  EmpresaPropsViaCep,
} from "../@types/Client";
// import { UsuarioProps } from "../@types/Usuario";
import { EmpresaListaProps } from "../pages/Empresas";
import { ColaboradorListaProps, ColaboradorProps } from "../@types/Colaborador";

/*EMPRESA*/

const getEmpresa = (): AxiosPromise<EmpresaListaProps[]> =>
  xhr.get(`empresas/`);

const getClientByCpf = (cpf: string): AxiosPromise<EmpresaProps> =>
  xhr.get(`clientes/${cpf}`);

const getClientByCNPJ = (cnpj: string): AxiosPromise<EmpresaProps> =>
  xhr.get(`clientes/${cnpj}`);

const getEmpresaByID = (id: string): AxiosPromise<EmpresaProps> =>
  xhr.get(`empresas/${id}`);

const postCreateEmpresa = (params: EmpresaProps): AxiosPromise<EmpresaProps> =>
  xhr.post(`empresas/`, params);

const postAtualizaEmpresa = (
  id: string,
  params: AtuEmpresa
): AxiosPromise<AtuEmpresa> => xhr.put(`empresas/${id}`, params);

const deleteEmpresa = (id: string) => xhr.delete(`empresas/${id}`);

/*EMPRESA*/

/*CLIENTES*/
const postCreateCliente = (params: ClienteProps): AxiosPromise<ClienteProps> =>
  xhr.post(`clientes/`, params);

const getClienteById = (id: string): AxiosPromise<ClienteProps> =>
  xhr.get(`clientes/${id}`);

/*CLIENTES*/

/*COLABORADOR*/

const getColaborador = (): AxiosPromise<ColaboradorListaProps[]> =>
  xhr.get(`colaborador/`);

const getColaboradorByID = (id: string): AxiosPromise<ColaboradorProps> =>
  xhr.get(`colaborador/${id}`);

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
  getEmpresaByID,
  postCreateEmpresa,
  viaCep,
  getEmpresa,
  deleteEmpresa,
  getColaborador,
  deleteColaborador,
  postCreateColaborador,
  postAtualizaEmpresa,
  getColaboradorByID,
  postCreateCliente,
  getClienteById,
};
