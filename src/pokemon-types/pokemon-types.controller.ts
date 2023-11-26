import { Controller, Get } from '@nestjs/common';
import { PokemonTypesService } from './pokemon-types.service';

@Controller('pokemon-types')
export class PokemonTypesController {

    constructor( private readonly pokemonTypeService: PokemonTypesService){}

    @Get('allTypes')
    async getTypes(): Promise<any>{
        try{
            const allTypes = await this.pokemonTypeService.getAllTypes();
            return allTypes;
        }catch(e){

        }
    }

}
