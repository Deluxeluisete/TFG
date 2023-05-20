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
  @Get('')
  async listarLugares() {
    const resultado = await this.lugarService.listar();
    console.log('hola ' + resultado);
    return resultado;
  }
  @Post('')
  async insertarUsuarios(@Res() res, @Body() body) {
    try {
      // await this.lugarService.otroMetodo();
      await this.lugarService.insertar(body);
      res.status(200).send({ ok: true, resultado: body });
    } catch (error) {
      res.status(400).send({ ok: false, resultado: 'error' });
    }
  }
}
