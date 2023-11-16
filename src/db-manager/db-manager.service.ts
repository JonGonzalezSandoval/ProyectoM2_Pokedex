import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PokemonAbility,
  PokemonAbilityDocument,
} from 'src/pokemon-abilities/pokemon-abilities.schema';
import {
  PokemonType,
  PokemonTypeDocument,
} from 'src/pokemon-types/pokemon-types.schema';
import { Pokemon, PokemonDocument } from 'src/pokemon/pokemon.schema';

@Injectable()
export class DbManagerService {
  public allPokemon = [];
  public allPokemonObjects = [];
  public allPokemonTypes = [];
  public allPokemonTypesObjects = [];
  public allPokemonAbilities = [];
  public allPokemonAbilitiesObjects = [];

  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
    @InjectModel(PokemonType.name)
    private pokemonTypeModel: Model<PokemonTypeDocument>,
    @InjectModel(PokemonAbility.name)
    private pokemonAbilityModel: Model<PokemonAbilityDocument>,
  ) {}

  /* *********************************************** POKEMON *************************************************************** */

  async getAllPokemon(): Promise<any> {
    let pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    let packOfPokemon = [];
    await fetch(pokeApiUrl)
      .then((res) => res.json())
      .then(async (res) => {
        packOfPokemon = res.results;
        pokeApiUrl = res.next;
        if (
          this.getPokemonNumber(packOfPokemon[packOfPokemon.length - 1]) >=
          10000
        ) {
          packOfPokemon = [...this.checkValidPokemonForms(packOfPokemon)];
          pokeApiUrl = null;
        }
        this.allPokemon.push(...packOfPokemon);        
        await this.createAllPokemonObjects();
        this.allPokemonObjects = this.allPokemonObjects.sort(
          (a, b) => a.pokedexNumber - b.pokedexNumber,
        );
        // console.log(this.allPokemonObjects);
        return await this.insertAllPokemon();
      });
  }

  async createAllPokemonObjects() {
    const allAbilitysID = await this.getAbilitiesID();
    const typesId = await this.getTypesID();
    // console.log('Empiezo a crear Objetos');

    const promises = this.allPokemon.map(async (pokemon) => {
      const retrievedPokemonObject = await this.getSpecificInfo(pokemon.url);
      const abilitiesSorted = await this.getAbilitiesName(
        retrievedPokemonObject.abilities,
        allAbilitysID,
      );
      let pokemonObject = {
        pokemonNumber: retrievedPokemonObject.id,
        name: retrievedPokemonObject.name,
        urlImg: retrievedPokemonObject.sprites.front_default,
        pokemonType: await this.getTypesCorrectly(
          retrievedPokemonObject.types,
          typesId,
        ),
        pokemonAbilities: abilitiesSorted.notHidden,
        hiddenAbility: abilitiesSorted.hidden[0],
      };
      return pokemonObject;
    });

    const allPromisesEnded = await Promise.all(promises);
    this.allPokemonObjects = allPromisesEnded;

    // console.log('Objetos Terminados de crear');
  }

  checkValidPokemonForms(pokemonList) {
    let newValidList = pokemonList.filter(
      (pokemon) => this.getPokemonNumber(pokemon) < 10000,
    );
    return newValidList;
  }

  getPokemonNumber(pokemon) {
    return pokemon.url.substring(34, pokemon.url.length - 1);
  }

  async getTypesCorrectly(typeLists, typesId) {
    const typesIdList = typesId;
    let typesCorrectlySettedUp = [];
    const promises = typeLists.map((type) => {
      let matchingID = typesIdList.find(
        (sType) => sType.name === type.type.name,
      );

      let newType = {
        // slot: type.slot,
        _id: matchingID.id,
      };
      return newType;
    });
    const allPromises = await Promise.all(promises);
    // console.log(allPromises);

    return (typesCorrectlySettedUp = allPromises);
  }

  async getAbilitiesName(abilityList, allAbilitysID) {
    // console.log('soyelprimero');

    const allAbilitysIDList = allAbilitysID;
    let abilitiesSorted = { hidden: [], notHidden: [] };
    abilityList.forEach((ability) => {
      let abilityID = allAbilitysIDList.find(
        (sAbility) => sAbility.name === ability.ability.name,
      );

      !ability.is_hidden
        ? abilitiesSorted.notHidden.push({ _id: abilityID.id })
        : abilitiesSorted.hidden.push({ _id: abilityID.id });
    });
    if (abilitiesSorted.hidden.length === 0)
      abilitiesSorted.hidden[0] = { _id: '6543b037be23ac9138f011ed' };
    return abilitiesSorted;
  }

  /* ***********************************************  TIPOS  ******************************************************************* */

  async getAllTypes(): Promise<any> {
    let pokeTypesUrl = 'https://pokeapi.co/api/v2/type';
    await fetch(pokeTypesUrl)
      .then((res) => res.json())
      .then((res) => {
        this.allPokemonTypes = [...res.results];
        if (
          this.getTypeNumber(
            this.allPokemonTypes[this.allPokemonTypes.length - 1],
          ) >= 10000
        ) {
          this.allPokemonTypes = [
            ...this.checkValidPokemonTypes(this.allPokemonTypes),
          ];
        }
      });

    await this.createAllTypesObjects();
    return this.insertAllTypes();
  }

  async createAllTypesObjects(): Promise<void> {
    const promiseArray = this.allPokemonTypes.map(async (type) => {
      let retrievedDataFromType = await this.getSpecificInfo(type.url);

      let newTypeObject = {
        name: retrievedDataFromType.name,
        doubleDamageFrom:
          retrievedDataFromType.damage_relations.double_damage_from.map(
            (data) => data.name,
          ),
        doubleDamageTo:
          retrievedDataFromType.damage_relations.double_damage_to.map(
            (data) => data.name,
          ),
        halfDamageFrom:
          retrievedDataFromType.damage_relations.half_damage_from.map(
            (data) => data.name,
          ),
        halfDamageTo: retrievedDataFromType.damage_relations.half_damage_to.map(
          (data) => data.name,
        ),
        noDamageFrom: retrievedDataFromType.damage_relations.no_damage_from.map(
          (data) => data.name,
        ),
        noDamageTo: retrievedDataFromType.damage_relations.no_damage_to.map(
          (data) => data.name,
        ),
      };
      return newTypeObject;
    });

    const allTypeObjects = await Promise.all(promiseArray);
    this.allPokemonTypesObjects = allTypeObjects;
    // console.log(this.allPokemonTypesObjects);
  }

  checkValidPokemonTypes(typeList): any {
    let newValidList = typeList.filter(
      (type) => this.getTypeNumber(type) < 10000,
    );
    return newValidList;
  }

  getTypeNumber(type): number {
    return type.url.substring(31, type.url.length - 1);
  }

  /* **************************************************** HABILIDADES ************************************************************** */

  async getAllAbilities(): Promise<any> {
    let pokeabilitiesUrl = 'https://pokeapi.co/api/v2/ability?limit=100000&offset=0';
    let packofAbilities = [];
    await fetch(pokeabilitiesUrl)
      .then((res) => res.json())
      .then(async (res) => {
        packofAbilities = res.results;
        pokeabilitiesUrl = res.next;
        if (
          this.getAbilityNumber(packofAbilities[packofAbilities.length - 1]) >=
          10000
        ) {
          packofAbilities = [
            ...this.checkValidPokemonAbilities(packofAbilities),
          ];
          pokeabilitiesUrl = null;
        }
        // this.pokeabilitiesUrl = null;
        this.allPokemonAbilities.push(...packofAbilities);
        await this.createAllAbilityObjects();
        // console.log(this.allPokemonAbilitiesObjects);
        this.insertAllAbilities();
      });
    // return this.allPokemonAbilitiesObjects
  }

  async createAllAbilityObjects(): Promise<any> {
    const promiseArray = this.allPokemonAbilities.map(async (ability) => {
      const retrievedAbilityObject = await this.getSpecificInfo(ability.url);
      // console.log(retrievedAbilityObject);
      const effectOfTheAbility = this.retireveCorrectLanguageEffects(
        retrievedAbilityObject.effect_entries,
      );
      let pokemonAbilityObject = {
        number: retrievedAbilityObject.id,
        name: retrievedAbilityObject.name,
        effect: effectOfTheAbility[0],
        shortEffect: effectOfTheAbility[1],
      };
      return pokemonAbilityObject;
    });

    const allAbilityObjects = await Promise.all(promiseArray);
    this.allPokemonAbilitiesObjects = allAbilityObjects;
  }

  retireveCorrectLanguageEffects(effectOptions): string[] {
    let choosenLanguage = [];
    effectOptions.forEach((languageOfTheEffect) => {
      if (languageOfTheEffect.language.name === 'en') {
        choosenLanguage.push(languageOfTheEffect.effect);
        choosenLanguage.push(languageOfTheEffect.short_effect);
      }
    });
    if (choosenLanguage.length === 0) {
      choosenLanguage.push('We dont have data from this ability');
      choosenLanguage.push('We dont have data from this ability');
    }
    return choosenLanguage;
  }

  checkValidPokemonAbilities(typeList): any {
    let newValidList = typeList.filter(
      (type) => this.getAbilityNumber(type) < 10000,
    );
    return newValidList;
  }

  getAbilityNumber(type): number {
    return type.url.substring(34, type.url.length - 1);
  }

  /* *****************************************************  GENERAL **************************************************************** */

  async getSpecificInfo(url: string): Promise<any> {
    let objectRetrieved;
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        objectRetrieved = res;
      });

    return objectRetrieved;
  }

  /* *************************************************  INSERCIONES ************************************************************************ */

  async insertAllTypes(): Promise<any> {
    try {
      const result = await this.pokemonTypeModel.insertMany(
        this.allPokemonTypesObjects,
      );
      return result;
    } catch {
      throw new InternalServerErrorException(
        'Ha cascado algo al meter los tipos',
      );
    }
  }

  async insertAllAbilities(): Promise<any> {
    try {
      const result = await this.pokemonAbilityModel.insertMany(
        this.allPokemonAbilitiesObjects,
      );
      // console.log(result, 'Resultado de la insercion');

      return result;
    } catch (err) {
      throw new InternalServerErrorException(
        'Ha cascado algo al meter las habilidades',
      );
    }
  }

  async insertAllPokemon(): Promise<any> {
    try {
      const result = await this.pokemonModel.insertMany(this.allPokemonObjects);

      // console.log(this.allPokemonObjects, 'Resultado de la insercion');
      return result;
    } catch (err) {
      console.log(err);

      // throw new InternalServerErrorException(
      //   'Ha cascado algo al meter los Pokemon',
      // );
    }
  }

  async getTypesID(): Promise<any[]> {
    try {
      const resultTypesID = await this.pokemonTypeModel.find(
        {},
        { _id: 1, name: 1 },
      );
      return resultTypesID;
    } catch {
      throw new NotFoundException('Error al solicitar los tipos');
    }
  }

  async getAbilitiesID(): Promise<any[]> {
    try {
      const resultAbilitiesID = await this.pokemonAbilityModel.find(
        {},
        { _id: 1, name: 1 },
      );
      return resultAbilitiesID;
    } catch {
      throw new NotFoundException('Error al solicitar los tipos');
    }
  }

  async createEverything(): Promise<any> {
    try {
      // const promises = await Promise.all([await this.getAllAbilities(), await this.getAllTypes()]);

      await this.getAllAbilities();
      await this.getAllTypes();

      // Use Promise.all() to wait for all promises in the array to resolve
      // await Promise.all(promises);

      // console.log('soy lo ultimo que tiene que pasar');
      await this.getAllPokemon();
    } catch (error) {
      console.log(error);

      throw new NotFoundException();
    }
  }
}
