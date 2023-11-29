import { Controller, UseGuards, Get, Post, Request, Response, Body, Delete, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersDto } from './dto/users.dto/users.dto';

@Controller('users')
export class UsersController {

    constructor (private readonly userService:UsersService){}

    @Post("newUser")
    async newUser(@Body() user:UsersDto, @Response() res: any){
        try {
            let rBack = await this.userService.newUser(user.name, user.username, user.password);

            return res.status(201).send(rBack);

        } catch (error) {
            
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post("getUser")
    async getUser(@Body() body:any):Promise<any>{
        try {
            await this.userService.getUser(body.username);
        } catch (error) {
            
        }
        // return await this.userService.findOne();
    }

    @UseGuards(JwtAuthGuard)
    @Put("updateUser")
    async updateUser(@Request() req:any, @Body() body:any){
        try {
            await this.userService.updateUser(body.username, body.user);
        } catch (error) {
            
        }
        
        
    }

    @UseGuards(JwtAuthGuard)
    @Delete("deleteUser")
    async deleteUser(@Body() body:any){
        try {
            await this.userService.deleteUser(body.username);
        } catch (error) {
            
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('getUserList')
    async getFavIdList(@Query('range') range, @Query('offset') offset,@Body() body:any){
        try {
            let defaultRange = 100000;
            let defaultStart = 0;
            if(range !== undefined) defaultRange = parseInt(range)
            if(offset !== undefined) defaultStart = parseInt(offset)
            return await this.userService.getUserList(range, offset ,body.username)
        } catch (error) {
            
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put("updateFavorite")
    async addCaputed(@Response() res:any, @Body() body:any){
        try {
            const updated = await this.userService.updateFavorite(body.username, body.pokemonId);
            return res.status(200).send(updated);
        } catch (error) {
            
        }
    }


    

}
