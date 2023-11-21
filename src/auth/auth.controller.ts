import { Controller, Get, UseGuards, Request, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.ACCEPTED)
    async login(@Request() req): Promise<any>{
        try{
            return this.authService.login(req.user);
        }catch(e){
            return "Usuario Invalido"
        }

    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        
        return req.user;
    }

}
