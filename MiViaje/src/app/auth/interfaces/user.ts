export interface User {
  id?: number;
  imagen: string;
  nombre: string;
  apellidos: string;
  contrasena: string;
  email: string;
  telefono: string;
  nacimiento?: Date;
  admin:Boolean;
}

export interface UserLogin {
  email: string;
  contrasena: string;

}

