import xhr from "./xhr";
import { AxiosPromise } from "axios";
import { AtuEmpresa, ClienteProps, EmpresaPropsViaCep } from "../@types/Client";
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

const getEmpresaByID = (id: string): AxiosPromise<ClienteProps> =>
  xhr.get(`empresas/${id}`);

const postCreateCliente = (params: ClienteProps): AxiosPromise<ClienteProps> =>
  xhr.post(`clientes/`, params);

const postAtualizaEmpresa = (
  id: string,
  params: AtuEmpresa
): AxiosPromise<AtuEmpresa> => xhr.put(`empresas/${id}`, params);

const deleteEmpresa = (id: string) => xhr.delete(`empresas/${id}`);

/*EMPRESA*/

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
  postCreateCliente,
  viaCep,
  getEmpresa,
  deleteEmpresa,
  getColaborador,
  deleteColaborador,
  postCreateColaborador,
  postAtualizaEmpresa,
  getColaboradorByID,
};
