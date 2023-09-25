import xhr from "./xhr";
import { AxiosPromise } from "axios";
import {
  AtuCliente,
  AtuEmpresa,
  ClienteProps,
  EmpresaProps,
  EmpresaPropsViaCep,
} from "../@types/Client";
import { EmpresaListaProps } from "../pages/Empresas";
import {
  AtuColaboradorProps,
  ColaboradorListaProps,
  ColaboradorProps,
} from "../@types/Colaborador";
import { AtuUsuario, UsuarioProps } from "../@types/Usuario";
import { CobrancaProps } from "../@types/Cobranca";

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
const postCreateCliente = (
  params: ClienteProps,
  id_empresa: string
): AxiosPromise<ClienteProps> => xhr.post(`clientes/${id_empresa}`, params);

const getClienteByEmpresa = (id_empresa: string): AxiosPromise<ClienteProps> =>
  xhr.get(`clientes/${id_empresa}`);

const postAtualizaCliente = (
  id_empresa: string,
  params: AtuCliente
): AxiosPromise<AtuCliente> => xhr.put(`clientes/${id_empresa}`, params);

/*CLIENTES*/

/*COLABORADOR*/

const getColaborador = (): AxiosPromise<ColaboradorListaProps[]> =>
  xhr.get(`colaborador/`);

const getColaboradorByID = (id: string): AxiosPromise<ColaboradorProps> =>
  xhr.get(`colaborador/${id}`);

const getColaboradorByEmail = (email: string): AxiosPromise<ColaboradorProps> =>
  xhr.get(`colaborador/${email}`);

const deleteColaborador = (id: string) => xhr.delete(`colaborador/${id}`);

const postCreateColaborador = (
  params: ColaboradorListaProps
): AxiosPromise<ColaboradorProps> => xhr.post(`colaborador/`, params);

const postAtualizaColaborador = (
  id: string,
  params: AtuColaboradorProps
): AxiosPromise<AtuColaboradorProps> => xhr.put(`colaborador/${id}`, params);

/*COLABORADOR*/

/* COBRANCA */

const getCobrancas = (): AxiosPromise<CobrancaProps[]> => xhr.get(`cobrancas/`);

const postCreateCobranca = (
  id_empresa: string,
  params: CobrancaProps
): AxiosPromise<CobrancaProps> => xhr.post(`cobrancas/${id_empresa}`, params);

/* COBRANCA */

/*USUARIO*/
const checkLogin = (params: UsuarioProps): AxiosPromise<UsuarioProps> =>
  xhr.post(`sessions/`, params);

const updateNome = (id: string, params: AtuUsuario): AxiosPromise<AtuUsuario> =>
  xhr.put(`usuarios/${id}`, params);

const getUsuarioById = (id: string): AxiosPromise<UsuarioProps> =>
  xhr.get(`usuarios/${id}`);

const postCreateUsuario = (params: UsuarioProps): AxiosPromise<UsuarioProps> =>
  xhr.post(`usuarios/`, params);

const postRecuperarSenha = (email: string): AxiosPromise<UsuarioProps> =>
  xhr.post(`usuarios/forgot-password`, email);
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
  getClienteByEmpresa,
  checkLogin,
  updateNome,
  getUsuarioById,
  postCreateUsuario,
  postAtualizaColaborador,
  getColaboradorByEmail,
  postAtualizaCliente,
  postRecuperarSenha,
  getCobrancas,
  postCreateCobranca,
};
