import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './pokemon.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { PokemonType, PokemonTypeSchema } from 'src/pokemon-types/pokemon-types.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: PokemonType.name,
        schema: PokemonTypeSchema,
      },
    ]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
