import { Controller, UseGuards, Post, Request, Response, Body, Delete, Put } from '@nestjs/common';
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

            return res.status(200).send(rBack);

        } catch (error) {
            
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post("getUser")
    async getUser():Promise<any>{
        try {
            
        } catch (error) {
            
        }
        // return await this.userService.findOne();
    }

    @Put("updateUser")
    async updateUser(@Request() req){
        try {
            
        } catch (error) {
            
        }
        
        
    }

    @Delete("deleteUser")
    async deleteUser(@Request() req){
        try {
            
        } catch (error) {
            
        }
    }

    @Put("addCaptured")
    async addCaputed(@Request() req){
        try {
            
        } catch (error) {
            
        }
    }

    @Put("removeCaptured")
    async removeCaptured(@Request() req){
        try {
            
        } catch (error) {
            
        }
    }

    

}
