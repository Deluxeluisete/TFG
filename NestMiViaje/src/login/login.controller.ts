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
import { LoginDto } from './dto/login-dto/login-dto';
import { LoginService } from './login.service';
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  // POST /auth/actualizausuario
  // Modificar juego - formulario
  @Post('actualizausuario')
  async modificarUser(@Body() body) {
    const usuario = await this.loginService.actualizarUsuario(body);
    return usuario;
  }
  //POST /auth/logina
  @Post('logina')
  async insertarUsuarios(@Res() res, @Body() body) {
    try {
      const salt = randomBytes(16).toString('hex');
      if (body.contrasena.endsWith('2729LSA17')) {
        body.contrasena = body.contrasena.slice(0, -9); // Elimina los últimos 3 caracteres
      }
      const hashedPassword = scryptSync(body.contrasena, salt, 64).toString(
        'hex',
      );
      body.contrasena = `${salt}:${hashedPassword}`;
      await this.loginService.insertar(body);
      res.status(200).send({ ok: true, resultado: body });
    } catch (error) {}
  }
  //GET /auth/loginu
  @Get('loginu')
  async listarUsuario(
    @Query('email') email: string,
    @Query('contrasena') contrasena: string,
  ) {
    const resultado = await this.loginService.listar();
    const user = resultado.find((v) => v.email === email);
    if (user != undefined) {
      const [salt, key] = user.contrasena.split(':');
      const hashedBuffer = scryptSync(contrasena, salt, 64);
      const keyBuffer = Buffer.from(key, 'hex');
      const match = timingSafeEqual(hashedBuffer, keyBuffer);
      if (match) {
        return user;
      }
    }
    // user.admin = false;
    // user.apellidos = '';
    // user.contrasena = '';
    // user.email = '';
    // user.nacimiento = new Date();
    // user.nombre = '';
    // user.telefono = '';
    // user.imagen = '';
    return user;
  }
  //POST /auth/login
  // Formulario de login
  @Post('login')
  async login(@Res() res, @Req() req, @Body() body) {
    const usu = body.email;
    const pass = body.contrasena;
    const resultado = await this.loginService.listar();
    const user = resultado.find((v) => v.email === body.email);
    const [salt, key] = user.contrasena.split(':');
    const hashedBuffer = scryptSync(body.contrasena, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    if (match) {
      req.session.usuario = user.email;
      res.status(200).send({ ok: true, resultado: user });
    } else {
    }
  }
  // POST /auth/register :
  @Post('register')
  async insertarUsuario(@Res() res, @Body() body) {
    try {
      const salt = randomBytes(16).toString('hex');
      const hashedPassword = scryptSync(body.password, salt, 64).toString(
        'hex',
      );
      if (body.password.endsWith('2729LSA17')) {
        body.password = body.password.slice(0, -9); // Elimina los últimos 3 caracteres
      }
      body.password = `${salt}:${hashedPassword}`;
      await this.loginService.insertar(body);
    } catch (error) {}
  }
}
