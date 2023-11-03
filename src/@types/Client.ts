export interface EmpresaProps {
  id: string;
  tipo_cliente: string;
  cnpj: string;
  ie: string;
  cpf: string;
  nome: string;
  cep: string;
  rua: string;
  cidade: string;
  uf: string;
  bairro: string;
  numero: string;
  complemento: string;
  id_colaborador: string;
  ativa: string;
}

export interface EmpresaPropsViaCep {
  cnpj: string;
  cep: string;
  localidade: string;
  telefone: string;
  complemento?: string | undefined;
  nome: string;
  logradouro: string;
  uf: string;
  bairro: string;
  numero: string;
}

export interface AtuEmpresa {
  cnpj: string;
  ie: string;
  cpf: string;
  nome: string;
  cep: string;
  rua: string;
  cidade: string;
  uf: string;
  bairro: string;
  numero: string;
  complemento: string;
}

export interface InativaAtivaEmpresa {
  ativa: string;
}

export interface ClienteProps {
  id: string;
  cpf: string;
  rg: string;
  nome: string;
  email: string;
  telefone: string;
  id_empresa: string;
}

export interface ClienteConsultaProps {
  id: string;
  cpf: string;
  rg: string;
  nome: string;
  email: string;
  telefone: string;
  id_empresa: string;
}

export interface AtuCliente {
  cpf: string;
  rg: string;
  nome: string;
  email: string;
  telefone: string;
}
