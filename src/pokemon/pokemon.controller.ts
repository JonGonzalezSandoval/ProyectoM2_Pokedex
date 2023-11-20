import { Controller, Get, Param, ParseIntPipe, Query, Response, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('pokemon')
export class PokemonController {

    constructor(private readonly pokemonService: PokemonService) {}

    @Get("paginated")
    async getPokemonPaginated(@Response() res: any, @Query('range') range, @Query('offset') offset){
        
        let defaultRange = 100000;
        let defaultStart = 0;
        if(range !== undefined) defaultRange = parseInt(range)
        if(offset !== undefined) defaultStart = parseInt(offset)

        let cosa = await this.pokemonService.getPokemonPaginated(defaultRange, defaultStart);

        return res.status(200).send(cosa)
    }

    @UseGuards(JwtAuthGuard)
    @Get("captured/:userId")
    async getCapturedPokemon(@Response() res: any, @Param('userId') userId: string): Promise<any>{

        let cosa = await this.pokemonService.getCapturedPaginated(userId);

        // console.log(cosa);

        return res.status(200).send(cosa)
    }

}
