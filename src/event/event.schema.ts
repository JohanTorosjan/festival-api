import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Zone } from 'src/zone/zone.schema';
import { Type } from 'class-transformer';
import { Benevole } from 'src/benevole/schemas/benevole.schema';


export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {


    @Prop({ type: Date, required: true })
    beginingdate:Date;

    @Prop({ type: Date, required: true })
    endingdate:Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:Zone.name } )
    @Type(() => Zone)
    zone:Zone;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref:Benevole.name }]})
    @Type(() => Benevole)
    benevoles:[Benevole];


}

export const EventSchema = SchemaFactory.createForClass(Event);
