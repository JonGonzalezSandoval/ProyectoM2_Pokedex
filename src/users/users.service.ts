import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { Pokemon, PokemonDocument } from 'src/pokemon/pokemon.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
  ) {}

  async newUser(
    name: string,
    username: string,
    password: string,
  ): Promise<any> {

    let status = await this.userModel.create({
      name: name,
      username: username,
      password: password,
      capturedPokemon: [],
    });
    return status;
  }

  async findAll(): Promise<any> {
    return await this.userModel.find();
  }

  async findOne(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username }).lean();
  }

  async getUser(username: string){
    return await this.userModel.findOne({ username: username }).lean();
  }

  async updateUser(username: string, user: any){
    return await this.userModel.findOneAndUpdate({username: username},{name: user.name, password: user.password})
  }

  async deleteUser(username: string){
    return await this.userModel.deleteOne({username: username})
  }

  async getFavPokList(username: string): Promise<any> {
    const userData = await this.userModel.find({ username: username })
    .populate({
        path: 'capturedPokemon',
        populate: [
          { path: 'pokemonType' },
          { path: 'pokemonAbilities' },
          { path: 'hiddenAbility' },
        ]
      });
    
  }

//   async getUserList(username: string): Promise<any> {
//     const userData = await this.userModel.find({ username: username });
//     const allPokemon = await this.pokemonModel.find({})
//     const finalList = allPokemon.map(pokemon => {
//         const captured = userData[0].capturedPokemon.includes(pokemon._id)
//         // console.log(captured)
//         return [pokemon,captured]
//     })
    

//     return finalList;
    
//   }

  async getUserList(range: number, offset: number, username: string): Promise<any> {

    let before = null;
    let after = null;
    let actual = `http://localhost:3000/api/users/getUserList?range=${range}&offset=${offset}`;

    let dondeEmpieza = offset.toString();
    


    let limiteSuperior = 0;
    let limiteInferior = 0;

    limiteSuperior = parseInt(dondeEmpieza) + 30;
    limiteInferior = parseInt(dondeEmpieza) - 30;

    const userData = await this.userModel.find({ username: username });
    const allPokemon = await this.pokemonModel.find({})
    .skip(offset)
    .limit(range)
    .populate('pokemonType')
    .populate('pokemonAbilities')
    .populate('hiddenAbility');
    const finalList = allPokemon.map(pokemon => {
        const captured = userData[0].capturedPokemon.includes(pokemon._id)
        // console.log(captured)
        return [pokemon,captured]
    })

    const listaPokesTotal = await this.pokemonModel.find({});

    console.log('limiteInferior: ' + limiteInferior);

    if (limiteInferior > 0) {
      // start -= 30

      before = `http://localhost:3000/api/users/getUserList?range=${range}&offset=${limiteInferior}`;
    } else {
      before = `http://localhost:3000/api/users/getUserList?range=${range}&offset=0`;
    }

    // console.log(limiteSuperior, listaPokesTotal.length);

    console.log('limiteSuperior: ' + limiteSuperior);

    if (limiteSuperior < listaPokesTotal.length) {
      after = `http://localhost:3000/api/users/getUserList?range=${range}&offset=${limiteSuperior}`;
    }

    const objectToReturn = {
      pokemon: finalList,
      before: before,
      after: after,
      actual: actual,
    };

    return objectToReturn;
  }


  async updateFavorite(username: string, id) {
    try {
        const userData = await this.userModel.find({ username: username });

        if (!userData || userData.length === 0) {
            console.error("User not found");
            return null; // Handle the case where the user is not found
        }

        let newTempFavList;

        console.log("Before update - Captured Pokemon:", userData[0].capturedPokemon);

        if (userData[0].capturedPokemon.includes(id)) {
            newTempFavList = userData[0].capturedPokemon.filter(pokId => pokId.toString() !== id.toString());
        } else {
            newTempFavList = [...userData[0].capturedPokemon, id];
        }

        console.log("After update - New Captured Pokemon:", newTempFavList);

        const updatedUser = await this.userModel.findOneAndUpdate(
            { username: username },
            { capturedPokemon: newTempFavList },
            { new: true, select: 'username capturedPokemon' }
        );

        console.log("User updated:", updatedUser);

        return updatedUser;
    } catch (error) {
        console.error("Error updating user:", error);
        // Handle the error appropriately
        return null;
    }
}
}
