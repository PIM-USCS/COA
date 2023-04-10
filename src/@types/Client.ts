export interface ClienteProps {
  id: string;
  tipo_cliente: string;
  regime: string;
  cnpj: string;
  ie: string;
  cpf: string;
  rg: string;
  nome: string;
  cep: string;
  rua: string;
  cidade: string;
  uf: string;
  bairro: string;
  numero: string;
  complemento: string;
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
