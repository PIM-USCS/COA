export interface UsuarioProps {
  id?: string;
  email: string;
  senha: string;
  nome?: string;
  user?: {
    id: string;
  };
}

export interface AtuUsuario {
  nome: string;
}
