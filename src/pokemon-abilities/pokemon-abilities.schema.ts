import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document} from "mongoose";

export type PokemonAbilityDocument = PokemonAbility & Document;

@Schema()
export class PokemonAbility{
    @Prop()
    number: number;

    @Prop()
    name: string;

    @Prop()
    shortEffect: string;

    @Prop()
    effect: string;

}

export const PokemonAbilitySchema = SchemaFactory.createForClass(PokemonAbility)