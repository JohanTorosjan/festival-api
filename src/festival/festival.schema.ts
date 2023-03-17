import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { Zone } from '../zone/zone.schema';


export type FestivalDocument = HydratedDocument<Festival>;

@Schema()
export class Festival {
    
  @Prop()
  nom: string;

  @Prop()
  annee: string;

  @Prop()
  nombreDeJours: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref:Zone.name }] })
  @Type(() => Zone)
  zones: [Zone];

}

export const FestivalSchema = SchemaFactory.createForClass(Festival);
