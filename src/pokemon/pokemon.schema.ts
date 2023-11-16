import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { PokemonAbility } from "src/pokemon-abilities/pokemon-abilities.schema";
import { PokemonType } from "src/pokemon-types/pokemon-types.schema";

export type PokemonDocument = Pokemon & Document;

@Schema()
export class Pokemon{
    @Prop()
    pokemonNumber: number;

    @Prop()
    name: string;

    @Prop()
    urlImg: string;

    @Prop([{type: MongooseSchema.Types.ObjectId, ref: 'PokemonType'}])
    pokemonType: PokemonType[];

    @Prop([{type: MongooseSchema.Types.ObjectId, ref: 'PokemonAbility'}])
    pokemonAbilities: PokemonAbility[];

    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'PokemonAbility'})
    hiddenAbility: PokemonAbility;

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)