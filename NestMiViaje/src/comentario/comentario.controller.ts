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
import { ComentarioDto } from './dto/comentario-dto/comentario-dto';
import { ComentarioService } from './comentario.service';
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';
@Controller('comentario')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post('')
  async insertarUsuarios(@Res() res, @Body() body) {
    try {
      // await this.comentarioService.otroMetodo();
      await this.comentarioService.insertar(body);
      res.status(200).send({ ok: true, resultado: body });
    } catch (error) {
      res.status(400).send({ ok: false, resultado: 'error' });
    }
  }
}
