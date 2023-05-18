import { Injectable } from '@nestjs/common';
import { Itinerario } from './interfaces/itinerario/itinerario.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ItinerarioDto } from './dto/itinerario-dto/itinerario-dto';

@Injectable()
//definimos los servicios de acceso a la bd para nuestro modulo login
export class ItinerarioService {
  usuarios: Itinerario[] = [];
  constructor(
    @InjectModel('Itinerario')
    private readonly loginModel: Model<Itinerario>,
  ) {}

  async listar(): Promise<Itinerario[]> {
    return await this.loginModel.find().exec();
  }
  async buscarPorId(id: string): Promise<Itinerario> {
    return await this.loginModel.findById(id).exec();
  }
  async buscarPorEmail(email: string): Promise<Itinerario> {
    return await this.loginModel.findOne({ email }).exec();
  }
  async insertar(crearLoginDto: ItinerarioDto): Promise<Itinerario> {
    console.log('LLEGA5');
    const nuevaLogin = new this.loginModel(crearLoginDto);
    console.log('LLEGA6');

    return await nuevaLogin.save();
  }
  async borrar(id: string): Promise<Itinerario> {
    return await this.loginModel.findByIdAndRemove(id).exec();
  }

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
