export interface UsuarioProps {
  id?: string;
  email: string;
  senha: string;
  nome?: string;
  tipo_usuario?: string;
  user?: {
    id: string;
  };
}

export interface AtuUsuario {
  nome: string;
}
