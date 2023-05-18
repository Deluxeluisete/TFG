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

  async listar(): Promise<Login[]> {
    return await this.loginModel.find().exec();
  }
  async buscarPorId(id: string): Promise<Login> {
    return await this.loginModel.findById(id).exec();
  }
  async buscarPorEmail(email: string): Promise<Login> {
    return await this.loginModel.findOne({ email }).exec();
  }
  async insertar(crearLoginDto: LoginDto): Promise<Login> {
    console.log('LLEGA5');
    const nuevaLogin = new this.loginModel(crearLoginDto);
    console.log('LLEGA6');

    return await nuevaLogin.save();
  }
  async borrar(id: string): Promise<Login> {
    return await this.loginModel.findByIdAndRemove(id).exec();
  }

  async actualizar(id: string, actualizarLoginDto: LoginDto): Promise<Login> {
    return await this.loginModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            login: actualizarLoginDto.nombre,
            password: actualizarLoginDto.contrasena,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }
}
