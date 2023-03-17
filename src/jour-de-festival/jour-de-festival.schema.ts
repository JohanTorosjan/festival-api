import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type JourDeFestivalDocument = HydratedDocument<JourDeFestival>;

@Schema()
export class JourDeFestival {

    @Prop({ type: String, required: true })
    nom:String;

    @Prop({ type: Date, required: true })
    begining:Date;

    @Prop({ type: Date, required: true })
    ending:Date;

    @Prop({ type: [Date], required: true })
    creneaux:[Date];

}

export const JourFestivalSchema = SchemaFactory.createForClass(JourDeFestival);
