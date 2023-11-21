import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokemonAbility, PokemonAbilityDocument } from './pokemon-abilities.schema';
import { Model } from 'mongoose';

@Injectable()
export class PokemonAbilitiesService {

        constructor(@InjectModel(PokemonAbility.name) private pokemonAbiltyModel: Model<PokemonAbilityDocument>){}

        async getAllAbilities(): Promise<any>{
            return await this.pokemonAbiltyModel.find({})   
        }

}
