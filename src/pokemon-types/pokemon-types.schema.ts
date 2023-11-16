import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PokemonTypeDocument = PokemonType & Document;

@Schema()
export class PokemonType{
    @Prop()
    name:string;

    @Prop()
    doubleDamageFrom: string[];

    @Prop()
    doubleDamageTo: string[];

    @Prop()
    halfDamageFrom: string[];

    @Prop()
    halfDamageTo: string[];
    
    @Prop()
    noDamageFrom: string[];

    @Prop()
    noDamageTo: string[];


}

export const PokemonTypeSchema = SchemaFactory.createForClass(PokemonType)