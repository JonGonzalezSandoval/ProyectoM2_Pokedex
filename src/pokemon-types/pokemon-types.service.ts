import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokemonType, PokemonTypeDocument } from './pokemon-types.schema';
import { Model } from 'mongoose';

@Injectable()
export class PokemonTypesService {

    constructor(@InjectModel(PokemonType.name) private pokemonTypeModel: Model<PokemonTypeDocument>){}

    async getAllTypes():Promise<any>{

        this.pokemonTypeModel.find()
    }




}
