import { Module } from '@nestjs/common';
import { ComentarioController } from './comentario.controller';
import { ComentarioService } from './comentario.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ComentarioSchema } from './schema/comentario.schema';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Comentario', schema: ComentarioSchema },
    ]),
    LoginModule, // Agrega esta línea para importar el LoginModule
  ],
  controllers: [ComentarioController],
  providers: [ComentarioService],
  exports: [ComentarioService],
})
export class ComentarioModule {}
