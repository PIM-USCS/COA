import xhr from "./xhr";
import { AxiosPromise } from "axios";
import { ClienteProps } from "../@types/Client";

/*CLIENTES*/
const getClientByCpf = (cpf: string): AxiosPromise<ClienteProps> =>
  xhr.get(`clientes/${cpf}`);

const getClientByCNPJ = (cnpj: string): AxiosPromise<ClienteProps> =>
  xhr.get(`clientes/${cnpj}`);

const getClientByID = (id: string): AxiosPromise<ClienteProps> =>
  xhr.get(`clientes/${id}`);

/*CLIENTES*/

export { getClientByCpf, getClientByCNPJ, getClientByID };
