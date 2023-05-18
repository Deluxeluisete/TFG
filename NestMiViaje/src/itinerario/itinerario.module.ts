import { Module } from '@nestjs/common';
import { ItinerarioController } from './itinerario.controller';
import { ItinerarioService } from './itinerario.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItinerarioSchema } from './schema/itinerario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Itinerario', schema: ItinerarioSchema },
    ]),
  ],
  controllers: [ItinerarioController],
  providers: [ItinerarioService],
  exports: [ItinerarioService],
})
export class ItinerarioModule {}
