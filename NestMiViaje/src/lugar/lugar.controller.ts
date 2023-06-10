import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Delete,
  Post,
  Res,
  Req,
  Query,
} from '@nestjs/common';
import { LugarDto } from './dto/lugar-dto/lugar-dto';
import { LugarService } from './lugar.service';

@Controller('lugar')
export class LugarController {
  constructor(private readonly lugarService: LugarService) {}
  //GET /lugar
  @Get('')
  async listarLugares() {
    const resultado = await this.lugarService.listar();
    return resultado;
  }
  //DELETE /lugar/nombre
  @Delete(':nombre')
  async borrarLugares(@Res() res, @Param('nombre') nombre: string) {
    await this.lugarService.borrarPorNombre(nombre);
    res.status(200).send({ ok: true });
  }
  //POST /lugar
  @Post('')
  async insertarUsuarios(@Res() res, @Body() body) {
    try {
      await this.lugarService.insertar(body);
      res.status(200).send({ ok: true, resultado: body });
    } catch (error) {
      res.status(400).send({ ok: false, resultado: 'error' });
    }
  }
}
