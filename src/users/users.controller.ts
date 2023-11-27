import { Controller, UseGuards, Post, Request, Response, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersDto } from './dto/users.dto/users.dto';

@Controller('users')
export class UsersController {

    constructor (private readonly userService:UsersService){}

    @Post("newUser")
    async newUser(@Response() res:UsersDto){
        
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
