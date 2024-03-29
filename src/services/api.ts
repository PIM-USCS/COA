import xhr from "./xhr";
import { AxiosPromise } from "axios";
import {
  AtuCliente,
  AtuEmpresa,
  ClienteConsultaProps,
  ClienteProps,
  EmpresaProps,
  EmpresaPropsViaCep,
  InativaAtivaEmpresa,
} from "../@types/Client";
import { EmpresaListaProps } from "../pages/Empresas";
import {
  AtuColaboradorProps,
  ColaboradorListaProps,
  ColaboradorProps,
} from "../@types/Colaborador";
import { AtuUsuario, ResetarSenha, UsuarioProps } from "../@types/Usuario";
import {
  AtualizaCobrancaProps,
  CobrancaProps,
  TiposguiaAtualizaProps,
  TiposguiaProps,
} from "../@types/Cobranca";
import { ReciboProps } from "../@types/Recibo";

/* DASHBOARD */

const getGuiaByCliente = (id_empresa: string): AxiosPromise<CobrancaProps[]> =>
  xhr.get(`dashboard/guias-status/${id_empresa}`);

/* DASHBOARD */

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

const putInativaAtivaEmpresa = (
  id: string,
  params: InativaAtivaEmpresa
): AxiosPromise<InativaAtivaEmpresa> => xhr.put(`empresas/ativa/${id}`, params);

/*EMPRESA*/

/*CLIENTES*/

const getClientes = (): AxiosPromise<ClienteProps[]> => xhr.get(`clientes/`);

const postCreateCliente = (
  params: ClienteProps,
  id_empresa: string
): AxiosPromise<ClienteProps> => xhr.post(`clientes/${id_empresa}`, params);

const getClienteByEmpresa = (id_empresa: string): AxiosPromise<ClienteProps> =>
  xhr.get(`clientes/${id_empresa}`);

const getClienteByCPF = (cpf: string): AxiosPromise<ClienteConsultaProps> =>
  xhr.get(`clientes/getCPF/${cpf}`);

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

const getCobrancaById = (id: string): AxiosPromise<CobrancaProps> =>
  xhr.get(`cobrancas/${id}`);

const postCreateCobranca = (
  id_empresa: string,
  params: CobrancaProps
): AxiosPromise<CobrancaProps> => xhr.post(`cobrancas/${id_empresa}`, params);

const deleteCobranca = (id: string) => xhr.delete(`cobrancas/${id}`);

const postAtualizaCobranca = (
  id: string,
  params: AtualizaCobrancaProps
): AxiosPromise<AtualizaCobrancaProps> => xhr.put(`cobrancas/${id}`, params);

/* COBRANCA */

/* TIPOS GUIA */

const getTiposguia = (): AxiosPromise<TiposguiaProps[]> =>
  xhr.get(`tiposguia/`);

const getTiposguiaByID = (id: string): AxiosPromise<TiposguiaProps> =>
  xhr.get(`tiposguia/${id}`);

const deleteTipoguia = (id: string) => xhr.delete(`tiposguia/${id}`);

const postCreateTipoguia = (
  params: TiposguiaProps
): AxiosPromise<TiposguiaProps> => xhr.post(`tiposguia/`, params);

const putAtualizaTipoguia = (
  id: string,
  params: TiposguiaAtualizaProps
): AxiosPromise<TiposguiaAtualizaProps> => xhr.put(`tiposguia/${id}`, params);

/* TIPOS GUIA */

/*USUARIO*/
const checkLogin = (params: UsuarioProps): AxiosPromise<UsuarioProps> =>
  xhr.post(`sessions/`, params);

const updateNome = (id: string, params: AtuUsuario): AxiosPromise<AtuUsuario> =>
  xhr.put(`usuarios/${id}`, params);

const getUsuarioById = (id: string): AxiosPromise<UsuarioProps> =>
  xhr.get(`usuarios/${id}`);

const postCreateUsuario = (params: UsuarioProps): AxiosPromise<UsuarioProps> =>
  xhr.post(`usuarios/`, params);

const postRecuperarSenha = (params: UsuarioProps): AxiosPromise<UsuarioProps> =>
  xhr.post(`usuarios/forgot-password`, params);

const putRecuperarSenha = (
  token: string,
  params: ResetarSenha
): AxiosPromise<ResetarSenha> =>
  xhr.put(`usuarios/recuperar-senha/${token}`, params);

const putAtualizaUsuario = (
  id: string,
  params: ResetarSenha
): AxiosPromise<ResetarSenha> => xhr.put(`usuarios/${id}`, params);

const patchAtualizaAvatar = (id: string, formData: FormData): AxiosPromise =>
  xhr.patch(`usuarios/avatar/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
/*USUARIO*/

/*RECIBOS*/
const postCreateRecibo = (
  id_cobranca: string,
  params: ReciboProps
): AxiosPromise<ReciboProps> => xhr.post(`recibos/${id_cobranca}`, params);

const patchAtualizaarquivo = (id: string, formData: FormData): AxiosPromise =>
  xhr.patch(`recibos/anexo/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const getReciboByIDCobranca = (id: string): AxiosPromise<ReciboProps[]> =>
  xhr.get(`recibos/${id}`);

const deleteRecibo = (id: string) => xhr.delete(`recibos/${id}`);

/*RECIBOS*/
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
  getCobrancaById,
  putRecuperarSenha,
  getClienteByCPF,
  getClientes,
  getGuiaByCliente,
  patchAtualizaAvatar,
  patchAtualizaarquivo,
  postCreateRecibo,
  deleteCobranca,
  getReciboByIDCobranca,
  deleteRecibo,
  postAtualizaCobranca,
  putAtualizaUsuario,
  putInativaAtivaEmpresa,
  getTiposguia,
  deleteTipoguia,
  postCreateTipoguia,
  putAtualizaTipoguia,
  getTiposguiaByID,
};
