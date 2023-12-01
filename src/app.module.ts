import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { UsersModule } from './users/users.module';
import { PokemonTypesModule } from './pokemon-types/pokemon-types.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DbManagerModule } from './db-manager/db-manager.module';
import { PokemonAbilitiesModule } from './pokemon-abilities/pokemon-abilities.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://jon:${process.env.MONGODB_PWD}@cluster0.5bpjxsd.mongodb.net/?retryWrites=true&w=majority`),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    PokemonModule,
    UsersModule,
    PokemonTypesModule,
    DbManagerModule,
    PokemonAbilitiesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
