import { Injectable } from '@nestjs/common';
import { Login } from './interfaces/login/login.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/login-dto/login-dto';

@Injectable()
//definimos los servicios de acceso a la bd para nuestro modulo login
export class LoginService {
  usuarios: Login[] = [];
  constructor(
    @InjectModel('Login')
    private readonly loginModel: Model<Login>,
  ) {}
  //listado de usuarios logueados
  async listar(): Promise<Login[]> {
    return await this.loginModel.find().exec();
  }
  //buscar un usuario por id
  async buscarPorId(id: string): Promise<Login> {
    return await this.loginModel.findById(id).exec();
  }

  //busca usuario por email
  async buscarPorEmail(email: string): Promise<Login> {
    return await this.loginModel.findOne({ email }).exec();
  }
  //actualiza algunos campos del usuario
  async actualizarUsuario(user: LoginDto): Promise<Login> {
    const usuarioExistente = await this.loginModel.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          telefono: user.telefono,
          nombre: user.nombre,
          apellidos: user.apellidos,
          contrasena: user.contrasena,
          nacimiento: user.nacimiento,
        },
      },
      { new: true },
    );

    return usuarioExistente;
  }
  //inserta un usuario
  async insertar(crearLoginDto: LoginDto): Promise<Login> {
    const nuevaLogin = new this.loginModel(crearLoginDto);
    return await nuevaLogin.save();
  }

  //borra usuario por su id
  async borrar(id: string): Promise<Login> {
    return await this.loginModel.findByIdAndRemove(id).exec();
  }
}
