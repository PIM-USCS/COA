export interface CobrancaProps {
  id: string;
  id_empresa?: string;
  vencimento_cobranca?: string;
  emissao_cobranca?: string;
  arquivo?: string;
  valor?: string;
  status?: string;
  descricao: string;
}

export interface AtualizaCobrancaProps {
  id?: string;
  id_empresa?: string;
  vencimento_cobranca?: string;
  emissao_cobranca?: string;
  valor?: string;
  status?: string;
  descricao?: string;
}

export interface TiposguiaProps {
  id: string;
  descricao: string;
}

export interface TiposguiaAtualizaProps {
  descricao: string;
}
