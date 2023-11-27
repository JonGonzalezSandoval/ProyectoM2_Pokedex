import { IsString } from "class-validator";

export class UsersDto {

    @IsString({message: "Your name must be a String of character"})
    name: string;

    @IsString({message: "Your username must be a String of characters"})
    username: string;

    @IsString({message: "Your password must be a String of Alphanumeric Characters"})
    password: string;

    
}
