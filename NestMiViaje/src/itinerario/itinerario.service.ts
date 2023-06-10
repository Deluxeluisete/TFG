import { Injectable } from '@nestjs/common';
import { Itinerario } from './interfaces/itinerario/itinerario.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ItinerarioDto } from './dto/itinerario-dto/itinerario-dto';

@Injectable()
//definimos los servicios de acceso a la bd para nuestro modulo itinerario
export class ItinerarioService {
  usuarios: Itinerario[] = [];
  constructor(
    @InjectModel('Itinerario')
    private readonly loginModel: Model<Itinerario>,
  ) {}
  //Devuelve un listado de itinerarios
  async listar(): Promise<Itinerario[]> {
    return await this.loginModel.find().exec();
  }
  //Busca un itinerario por id
  async buscarPorId(id: string): Promise<Itinerario> {
    return await this.loginModel.findById(id).exec();
  }
  //Busca un itinerario por el correo de la persona que lo ha creado
  async buscarPorEmail(email: string): Promise<Itinerario[]> {
    return await this.loginModel.find({ email }).exec();
  }
  //inserta un itinerario
  async insertar(crearLoginDto: ItinerarioDto): Promise<Itinerario> {
    const nuevaLogin = new this.loginModel(crearLoginDto);
    return await nuevaLogin.save();
  }
  //borra un itinerario por su id
  async borrar(id: string): Promise<Itinerario> {
    return await this.loginModel.findByIdAndRemove(id).exec();
  }
  //actualiza los datos del itinerario cuya id sea la pasada por param
  async actualizar(
    id: string,
    actualizarLoginDto: ItinerarioDto,
  ): Promise<Itinerario> {
    return await this.loginModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            login: actualizarLoginDto.datos,
            password: actualizarLoginDto.email,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }
}
