import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService){}

    async validateUser(username: string, sendPassword: string): Promise<any>{
        
        let user = await this.userService.findOne(username)
        
        if (user && user.password === sendPassword) {
            let { password, ...result } = user;
            
            return result;
        }
        return null;
    }

    async login(user: any) {

        const payload = { username: user.username, sub: user._id, name: user.name }
        return await this.jwtService.sign(payload)

    }

}
