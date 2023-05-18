export interface User {
  id?: number;
  nombre: string;
  apellidos: string;
  contrasena: string;
  email: string;
  telefono: string;
  nacimiento?: Date;
}

export interface UserLogin {
  email: string;
  contrasena: string;

}

