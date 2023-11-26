import { Controller, Get } from '@nestjs/common';
import { PokemonAbilitiesService } from './pokemon-abilities.service';

@Controller('pokemon-abilities')
export class PokemonAbilitiesController {
  constructor(private readonly abilityService: PokemonAbilitiesService) {}

  @Get('allAbilities')
  async getAllAbilities(): Promise<any> {
    try {
      const allAbilities = await this.abilityService.getAllAbilities();
      return allAbilities;
    } catch (e) {
      throw new Error(e);
    }
  }
}
