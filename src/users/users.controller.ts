import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor (private readonly userService:UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get("usuario")
    async getUser():Promise<any>{

        // return await this.userService.findOne();
    }

    @Post("updateUser")
    async updateUser(@Request() req){

        
    }

}
