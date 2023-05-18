import { User } from 'src/app/auth/interfaces/user';
export interface Comentario {
  id?: number;
  tematica: string;
  mensaje: string;
  Usuario: User;
}
