import { Inject, Injectable } from '@nestjs/common';
import { Lugar } from './interfaces/lugar/lugar.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LugarDto } from './dto/lugar-dto/lugar-dto';
import { Login } from 'src/login/interfaces/login/login.interface';
import { LoginService } from 'src/login/login.service';

@Injectable()
//definimos los servicios de acceso a la bd para nuestro modulo lugar
export class LugarService {
  usuarios: Lugar[] = [];

  constructor(
    @InjectModel('Lugar')
    private readonly lugarModel: Model<Lugar>,
  ) {}
  //Devuelve un listado de lugar
  async listar(): Promise<Lugar[]> {
    return await this.lugarModel.find().exec();
  }
  //Busca un lugar por id
  async buscarPorId(id: string): Promise<Lugar> {
    return await this.lugarModel.findById(id).exec();
  }
  //Busca un lugar por el correo de la persona que lo ha creado
  async buscarPorEmail(email: string): Promise<Lugar> {
    return await this.lugarModel.findOne({ email }).exec();
  }
  //inserta un lugar
  async insertar(crearLugarDto: LugarDto): Promise<Lugar> {
    const nuevoLugar = new this.lugarModel(crearLugarDto);
    return await nuevoLugar.save();
  }
  //borra un lugar por su id
  async borrar(id: string): Promise<Lugar> {
    return await this.lugarModel.findByIdAndRemove(id).exec();
  }
  //borra un lugar por su nombre
  async borrarPorNombre(nombre: string): Promise<Lugar | null> {
    try {
      // Buscar el lugar por su nombre
      const lugarEncontrado = await this.lugarModel.findOne({ nombre }).exec();
      if (lugarEncontrado) {
        // Eliminar el lugar encontrado
        await lugarEncontrado.remove();
        return lugarEncontrado;
      } else {
        return null; // No se encontró ningún lugar con el nombre especificado
      }
    } catch (error) {
      // Manejar el error en caso de que ocurra alguna excepción durante la eliminación
      console.error('Error al eliminar el lugar:', error);
      throw error;
    }
  }
}
