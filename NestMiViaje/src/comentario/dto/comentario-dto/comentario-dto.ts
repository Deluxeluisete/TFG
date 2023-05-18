import { Login } from 'src/login/interfaces/login/login.interface';

export class ComentarioDto {
  readonly id: string;
  readonly tematica: string;
  readonly mensaje: string;
  readonly Usuario: Login;
}
