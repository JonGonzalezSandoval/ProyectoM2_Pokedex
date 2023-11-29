import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon, PokemonDocument } from './pokemon.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/users.schema';
import { PokemonType, PokemonTypeDocument } from 'src/pokemon-types/pokemon-types.schema';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(PokemonType.name) private typeModel: Model<PokemonTypeDocument>,
  ) {}

  async getPokemonPaginated(range: number, start: number): Promise<any> {
    /**
     * TODO: SI RANGE > 30 REVISAR QUE HACER
     */

    let objectToReturn;
    let before = null;
    let after = null;
    // console.log(range);

    let limiteSuperior = 0;
    let limiteInferior = 0;

    limiteSuperior = start + 30;
    limiteInferior = start - 30;

    const listaPokes = await this.pokemonModel
      .find({})
      .skip(start)
      .limit(range)
      .populate('pokemonType')
      .populate('pokemonAbilities')
      .populate('hiddenAbility');

    const listaPokesTotal = await this.pokemonModel.find({});

    // console.log('limiteInferior: ' + limiteInferior);

    if (limiteInferior > 0) {
      // start -= 30

      before = `http://localhost:3000/api/pokemon/paginated?range=${range}&offset=${limiteInferior}`;
    } else {
      before = `http://localhost:3000/api/pokemon/paginated?range=${range}&offset=0`;
    }

    // console.log(limiteSuperior, listaPokesTotal.length);

    // console.log('limiteSuperior: ' + limiteSuperior);

    if (limiteSuperior < listaPokesTotal.length) {
      after = `http://localhost:3000/api/pokemon/paginated?range=${range}&offset=${limiteSuperior}`;
    }

    objectToReturn = {
      pokemon: listaPokes,
      before: before,
      after: after,
    };

    return objectToReturn;
  }

  async getCapturedPaginated(userID: string): Promise<any> {
    const listaCapturados = await this.userModel.findOne(
      { _id: userID },
      { _id: 0, capturedPokemon: 1 },
    );

    let objectIdList;

    if (listaCapturados && Array.isArray(listaCapturados.capturedPokemon)) {
      const capturedPokemonArray = listaCapturados.capturedPokemon;

      // Now, you can work with capturedPokemonArray as a regular array
      console.log(capturedPokemonArray);

      objectIdList = capturedPokemonArray.map((eachPokId) => {
        // Process each captured Pokemon ID here
        return eachPokId;
      });
    }

    const listaPokesTotal = await this.pokemonModel.find({});
  }

  async getPokemon(name: string): Promise<any> {
    const pokemon = await this.pokemonModel
      .find({ name: name })
      .populate('pokemonType')
      .populate('pokemonAbilities')
      .populate('hiddenAbility')
      .lean();

      this.crearEquivalenciaDeTipos(pokemon);

    if (!pokemon) {
      console.log('El pokemon no existe');
    } else {
      return pokemon;
    }
  }


  /**
   * TODO: Comerme la cabeza con el metodo
   */

  async crearEquivalenciaDeTipos(pokemon): Promise<any[]>{
    const allTypes = await this.typeModel.find({},{_id: 0, name: 1}).lean();
    let equivalenciaTipos = [{maxDamage: []}, {doubleDamage: []}, {neutral: []}, {halfDamage: []}, {lessDamage: []}, {inmune: []}]

    pokemon[0].pokemonType.map((typePo, i) => {

    })

    return []
  }


}
