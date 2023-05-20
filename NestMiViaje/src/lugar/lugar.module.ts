import { Module } from '@nestjs/common';
import { LugarController } from './lugar.controller';
import { LugarService } from './lugar.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LugarSchema } from './schema/lugar.schema';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lugar', schema: LugarSchema }]),
    LoginModule, // Agrega esta línea para importar el LoginModule
  ],
  controllers: [LugarController],
  providers: [LugarService],
  exports: [LugarService],
})
export class LugarModule {}
