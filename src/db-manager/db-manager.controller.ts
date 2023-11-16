import { Controller, Get, Response } from '@nestjs/common';
import { DbManagerService } from './db-manager.service';

@Controller('db-manager')
export class DbManagerController {
    
    constructor( private readonly dbManagerService: DbManagerService){}

    @Get('/createAll')
    async createAll(@Response() res:any): Promise<any>{
        try{

            await Promise.all([await this.dbManagerService.createEverything()]);
            
            return res.status(200).send("Todo se ha creado de puta madre")
        }catch(e){
            return res.status(e).send("Casco algo, averígualo")
        }
    }

    @Get('/createTypes')
    async getTypes(@Response() res:any): Promise<any>{
        try{
             let allTypes = await this.dbManagerService.getAllTypes()
             console.log(allTypes);
             return res.status(200).send("Tipos recuperados correctamente")
        }catch(e){
            return res.status(e).send("Problema al crear los tipos")
        }
    }
    @Get('/createAbilities')
    async getAbilities(@Response() res:any): Promise<any>{
        try{
             let allAbilities = await this.dbManagerService.getAllAbilities()
             console.log(allAbilities);
             return res.status(200).send("Habilidades recuperados correctamente")
        }catch(e){
            return res.status(e).send("Problema al crear las habilidades")
        }
    }
    @Get('/createPokemon')
    async getPokemon(@Response() res:any): Promise<any>{
        try{
             await Promise.all([await this.dbManagerService.getAllPokemon()])             
             return res.status(200).send('delocos')
        }catch(e){
            console.log(e);
            
            return res.status(e).send("Problema al crear las habilidades")
        }
    }

    @Get('/test')
    async testRetrievingIDs(): Promise<any>{
        return await this.dbManagerService.getAbilitiesID();
    }
    
}
