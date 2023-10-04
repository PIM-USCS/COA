export interface UsuarioProps {
  id?: string;
  email: string;
  senha: string;
  nome?: string;
  id_empresa?: string;
  id_colaborador?: string;
  tipo_usuario?: string;
  token?: string;
  user?: {
    id: string;
  };
}

export interface AtuUsuario {
  nome: string;
}

export interface ResetarSenha {
  senha: string;
}
