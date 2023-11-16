import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
    
    async findAll(): Promise<any>{
        return await this.userModel.find();
    }

    async findOne(username: string): Promise<User>{
        return await this.userModel.findOne({username: username}).lean();
    }
}
