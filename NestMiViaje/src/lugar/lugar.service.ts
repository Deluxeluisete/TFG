import { Inject, Injectable } from '@nestjs/common';
import { Lugar } from './interfaces/lugar/lugar.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LugarDto } from './dto/lugar-dto/lugar-dto';
import { Login } from 'src/login/interfaces/login/login.interface';
import { LoginService } from 'src/login/login.service';

@Injectable()
//definimos los servicios de acceso a la bd para nuestro modulo login
export class LugarService {
  usuarios: Lugar[] = [];

  constructor(
    @InjectModel('Lugar')
    private readonly lugarModel: Model<Lugar>,
  ) {}

  async listar(): Promise<Lugar[]> {
    return await this.lugarModel.find().exec();
  }
  async buscarPorId(id: string): Promise<Lugar> {
    return await this.lugarModel.findById(id).exec();
  }

  async buscarPorEmail(email: string): Promise<Lugar> {
    return await this.lugarModel.findOne({ email }).exec();
  }
  async insertar(crearLugarDto: LugarDto): Promise<Lugar> {
    const nuevoLugar = new this.lugarModel(crearLugarDto);
    return await nuevoLugar.save();
  }

  async borrar(id: string): Promise<Lugar> {
    return await this.lugarModel.findByIdAndRemove(id).exec();
  }
}
