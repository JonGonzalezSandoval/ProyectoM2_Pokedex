import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Pokemon } from "src/pokemon/pokemon.schema";


export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop()
    name: string;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop([{type: MongooseSchema.Types.ObjectId, ref: 'Pokemon'}])
    capturedPokemon: Pokemon[];

}

export const UserSchema = SchemaFactory.createForClass(User);