import { Controller, UseGuards, Post, Request, Response } from '@nestjs/common';
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

        // return await this.userService.findOne();
    }

    @Post("updateUser")
    async updateUser(@Request() req){

        
        
    }

    @Post("deleteUser")
    async deleteUser(){

    }

    

}
