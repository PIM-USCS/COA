import xhr from "./xhr";
import { AxiosPromise } from "axios";
import { ClienteProps, EmpresaPropsViaCep } from "../@types/Client";

/*CLIENTES*/
const getClientByCpf = (cpf: string): AxiosPromise<ClienteProps> =>
  xhr.get(`clientes/${cpf}`);

const getClientByCNPJ = (cnpj: string): AxiosPromise<ClienteProps> =>
  xhr.get(`clientes/${cnpj}`);

const getClientByID = (id: string): AxiosPromise<ClienteProps> =>
  xhr.get(`clientes/${id}`);

const postCreateCliente = (params: ClienteProps): AxiosPromise<ClienteProps> =>
  xhr.post(`clientes/`, params);

/*CLIENTES*/

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
};
