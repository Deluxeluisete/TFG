import { Inject, Injectable } from '@nestjs/common';
import { Comentario } from './interfaces/comentario/comentario.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ComentarioDto } from './dto/comentario-dto/comentario-dto';
import { Login } from 'src/login/interfaces/login/login.interface';
import { LoginService } from 'src/login/login.service';

@Injectable()
//definimos los servicios de acceso a la bd para nuestro modulo login
export class ComentarioService {
  usuarios: Comentario[] = [];

  constructor(
    @InjectModel('Comentario')
    private readonly comentarioModel: Model<Comentario>,
    private readonly loginService: LoginService,
  ) {}
  //Devuelve un listado de comentarios
  async listar(): Promise<Comentario[]> {
    return await this.comentarioModel.find().exec();
  }
  //Busca un comentario por id
  async buscarPorId(id: string): Promise<Comentario> {
    return await this.comentarioModel.findById(id).exec();
  }
  //Busca un comentario por el mail de la persona que lo haya puesto
  async buscarPorEmail(email: string): Promise<Comentario> {
    return await this.comentarioModel.findOne({ email }).exec();
  }
  //inserta un comentario si el usuario que lo pone existe entre los usuarios registrados
  async insertar(crearComentarioDto: ComentarioDto): Promise<Comentario> {
    const logins: Login[] = await this.loginService.listar();
    const email = crearComentarioDto.Usuario.email;
    const loginExistente = logins.find((login) => login.email === email);
    if (!loginExistente) {
      throw new Error(
        'El correo proporcionado no está registrado en la tabla de logins',
      );
    }

    const nuevoComentario = new this.comentarioModel(crearComentarioDto);
    return await nuevoComentario.save();
  }
  //borra comentario por su id
  async borrar(id: string): Promise<Comentario> {
    return await this.comentarioModel.findByIdAndRemove(id).exec();
  }

  //actualiza un comentario por su id
  async actualizar(
    id: string,
    actualizarLoginDto: ComentarioDto,
  ): Promise<Comentario> {
    return await this.comentarioModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            login: actualizarLoginDto.mensaje,
            password: actualizarLoginDto.tematica,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }
}
