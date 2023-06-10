export class LoginDto {
  readonly id: string;
  readonly imagen: string;
  readonly nombre: string;
  readonly apellidos: string;
  readonly contrasena: string;
  readonly email: string;
  readonly telefono: string;
  readonly nacimiento: Date;
  readonly admin: boolean;
}
