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
import {
  AtuColaboradorProps,
  ColaboradorListaProps,
  ColaboradorProps,
} from "../@types/Colaborador";
import { AtuUsuario, UsuarioProps } from "../@types/Usuario";

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

const postAtualizaColaborador = (
  id: string,
  params: AtuColaboradorProps
): AxiosPromise<AtuColaboradorProps> => xhr.put(`colaborador/${id}`, params);

/*COLABORADOR*/

/*USUARIO*/
const checkLogin = (params: UsuarioProps): AxiosPromise<UsuarioProps> =>
  xhr.post(`sessions/`, params);

const updateNome = (id: string, params: AtuUsuario): AxiosPromise<AtuUsuario> =>
  xhr.put(`usuarios/${id}`, params);

const getUsuarioById = (id: string): AxiosPromise<UsuarioProps> =>
  xhr.get(`usuarios/${id}`);

const postCreateUsuario = (params: UsuarioProps): AxiosPromise<UsuarioProps> =>
  xhr.post(`usuarios/`, params);
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
  checkLogin,
  updateNome,
  getUsuarioById,
  postCreateUsuario,
  postAtualizaColaborador,
};
