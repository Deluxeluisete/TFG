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

  @Post('logina')
  async insertarUsuarios(@Res() res, @Body() body) {
    console.log('llega');
    try {
      const salt = randomBytes(16).toString('hex');
      console.log('llega2');

      const hashedPassword = scryptSync(body.contrasena, salt, 64).toString(
        'hex',
      );
      console.log(body.nombre);
      console.log('llega3');

      body.contrasena = `${salt}:${hashedPassword}`;
      await this.loginService.insertar(body);
      console.log('4');

      res.status(200).send({ ok: true, resultado: body });
    } catch (error) {
      res.render('publico_error', { error: 'Error al insertar el usuario' });
    }
  }

  @Get('login')
  async listar(@Res() res) {
    return res.render('auth_login');
  }
  @Get('logina')
  async listarLogueados() {
    const resultado = await this.loginService.listar();
    console.log('hola ' + resultado);
    return resultado;
  }
  @Get('loginu')
  async listarUsuario(@Query('email') email: string) {
    console.log(email);
    const resultado = await this.loginService.buscarPorEmail(email);
    console.log('hola ' + resultado);
    return resultado;
  }
  @Post('loginu')
  async listarUsuarioPost(@Res() res, @Body() body) {
    console.log(body.email);
    const resultado = await this.loginService.buscarPorEmail(body.email);
    console.log('hola ' + resultado);
    return resultado;
  }
  @Get('register')
  async listarRegister(@Res() res) {
    return res.render('auth_register');
  }
  // Formulario de login
  @Post('login')
  async login(@Res() res, @Req() req, @Body() body) {
    const usu = body.email;
    const pass = body.contrasena;
    const resultado = await this.loginService.listar();
    // const existe = resultado.filter(
    //   (usuario) => usuario.login == usu && usuario.password == pass,
    // );
    const user = resultado.find((v) => v.email === body.email);
    const [salt, key] = user.contrasena.split(':');
    const hashedBuffer = scryptSync(body.contrasena, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    if (match) {
      req.session.usuario = user.email;
      console.log('todo bien');
      res.status(200).send({ ok: true, resultado: user });
    } else {
      res.render('auth_login', {
        error: 'Error usuario o contraseña incorrecta',
      });
    }
  }
  // POST /juegos :
  // Modificamos el juego desde el formulario
  @Post('register')
  async insertarUsuario(@Res() res, @Body() body) {
    try {
      const salt = randomBytes(16).toString('hex');
      const hashedPassword = scryptSync(body.password, salt, 64).toString(
        'hex',
      );

      body.password = `${salt}:${hashedPassword}`;
      await this.loginService.insertar(body);
      return res.render('auth_login');
    } catch (error) {
      res.render('publico_error', { error: 'Error al insertar el usuario' });
    }
  }

  @Get('logout')
  async cerrarSession(@Res() res, @Req() req) {
    req.session.destroy();
    res.render('publico_index');
  }
}
