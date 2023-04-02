import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { Event } from 'src/event/event.schema';

export type JourDeFestivalDocument = HydratedDocument<JourDeFestival>;

@Schema()
export class JourDeFestival {

    @Prop({ type: String, required: true })
    nom:String;

    @Prop({ type: Date, required: true })
    begining:Date;

    @Prop({ type: Date, required: true })
    ending:Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref:Event.name }]})
    @Type(() => Event)
    creneaux:[Event];
    /*
    @Prop({ type: [Date], required: true })
    creneaux:[Event];
    */

}

export const JourFestivalSchema = SchemaFactory.createForClass(JourDeFestival);
