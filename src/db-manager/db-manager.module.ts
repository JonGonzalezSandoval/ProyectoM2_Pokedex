import { Module } from '@nestjs/common';
import { DbManagerController } from './db-manager.controller';
import { DbManagerService } from './db-manager.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PokemonAbility,
  PokemonAbilitySchema,
} from 'src/pokemon-abilities/pokemon-abilities.schema';
import { Pokemon, PokemonSchema } from 'src/pokemon/pokemon.schema';
import {
  PokemonType,
  PokemonTypeSchema,
} from 'src/pokemon-types/pokemon-types.schema';
import { User, UserSchema } from 'src/users/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
      {
        name: PokemonAbility.name,
        schema: PokemonAbilitySchema,
      },
      {
        name: PokemonType.name,
        schema: PokemonTypeSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [DbManagerController],
  providers: [DbManagerService],
})
export class DbManagerModule {}
