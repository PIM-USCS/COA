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
  avatar?: string;
}

export interface AtuUsuario {
  id: string;
  nome: string;
  avatar?: File | null;
}

export interface ResetarSenha {
  email?: string;
  senha: string;
}
