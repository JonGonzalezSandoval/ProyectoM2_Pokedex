import { Module } from '@nestjs/common';
import { PokemonTypesController } from './pokemon-types.controller';
import { PokemonTypesService } from './pokemon-types.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonType, PokemonTypeSchema } from './pokemon-types.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PokemonType.name,
        schema: PokemonTypeSchema,
      },
    ]),
  ],
  controllers: [PokemonTypesController],
  providers: [PokemonTypesService]
})
export class PokemonTypesModule {}
