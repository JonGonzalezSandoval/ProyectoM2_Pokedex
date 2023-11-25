import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { Pokemon, PokemonDocument } from 'src/pokemon/pokemon.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Pokemon.name) private pokemonModel:Model<PokemonDocument>){}

    async newUser(name: string, username: string, password: string): Promise<void>{
        const allPokemon = await this.pokemonModel.find({});

        await this.userModel.create({name: name, username: username, password: password, capturedPokemon: [], missingPokemon: allPokemon});

    }
    
    async findAll(): Promise<any>{
        return await this.userModel.find();
    }

    async findOne(username: string): Promise<User>{
        return await this.userModel.findOne({username: username}).lean();
    }

    // async findUser(username: string): Promise<User>{

    // }
}
