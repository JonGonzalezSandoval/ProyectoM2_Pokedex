import { Module } from '@nestjs/common';
import { PokemonAbilitiesController } from './pokemon-abilities.controller';
import { PokemonAbilitiesService } from './pokemon-abilities.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonAbility, PokemonAbilitySchema } from './pokemon-abilities.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PokemonAbility.name,
        schema: PokemonAbilitySchema,
      },
    ]),
  ],
  controllers: [PokemonAbilitiesController],
  providers: [PokemonAbilitiesService]
})
export class PokemonAbilitiesModule {}
