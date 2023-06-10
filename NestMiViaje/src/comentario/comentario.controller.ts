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
  nodemailer = require('nodemailer');
  constructor(private readonly comentarioService: ComentarioService) {}
  //GET /comentario
  @Get('')
  async listarLogueados() {
    const resultado = await this.comentarioService.listar();
    return resultado;
  }
  //POST /comentario
  @Post('')
  async insertarUsuarios(@Res() res, @Body() body) {
    try {
      await this.comentarioService.insertar(body);
      res.status(200).send({ ok: true, resultado: body });
    } catch (error) {
      res.status(400).send({ ok: false, resultado: 'error' });
    }
  }
  //POST /comentario/mail
  @Post('mail')
  async sendMail(@Res() res, @Body() body) {
    try {
      const user = body;
      const transporter = this.nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'luisetesuaaba@gmail.com',
          pass: 'qxqguuyaeymbbrrf',
        },
      });
      const mailOptions = {
        from: '"MiViaje" <example@gmail.com>', // Remitente del correo
        to: user.email, // list of receivers
        subject: 'Reclamación Web', // Subject line
        html: `<h1>Hola ${user.nombre}</h1><br>
          <h4>Gracias por ponerte en contacto con nosotros te responderemos con la mayor brevedad posible</h4>`,
      };
      // send mail with defined transport object
      await transporter.sendMail(mailOptions);
      res.status(200).send({ ok: true, resultado: body });
    } catch (error) {
      res.status(400).send({ ok: false, resultado: 'error' });
    }
  }
}
