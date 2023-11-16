import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService){}

    async validateUser(username: string, sendPassword: string): Promise<any>{
        
        let user = await this.userService.findOne(username)
        // console.log("Linea 13 Auth.Service" + user.username, user.name);
        
        if (user && user.password === sendPassword) {
            let { password, ...result } = user;
            // console.log("Linea 17 Auth.Service" + result.name);
            
            
            return result;
        }
        return null;
    }

    async login(user: any) {
        
        const payload = { username: user.username, sub: user._id, name: user.name}
        return await this.jwtService.sign(payload)
    }

}
