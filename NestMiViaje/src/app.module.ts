import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JuegoModule } from './juego/juego.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModule } from './login/login.module';
import { ItinerarioModule } from './itinerario/itinerario.module';
import { ComentarioModule } from './comentario/comentario.module';

@Module({
  imports: [
    LoginModule,
    JuegoModule,
    ItinerarioModule,
    MongooseModule.forRoot('mongodb://localhost/miviaje'),
    ComentarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
