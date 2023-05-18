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
import { ItinerarioDto } from './dto/itinerario-dto/itinerario-dto';
import { ItinerarioService } from './itinerario.service';
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';
@Controller('itinerario')
export class ItinerarioController {
  constructor(private readonly itinerarioService: ItinerarioService) {}

  @Post('')
  async insertarUsuarios(@Res() res, @Body() body) {
    try {
      await this.itinerarioService.insertar(body);
      res.status(200).send({ ok: true, resultado: body });
    } catch (error) {
      res.status(404).send({ ok: false, resultado: 'error' });
    }
  }
}
