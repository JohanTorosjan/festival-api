import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type ZoneDocument = HydratedDocument<Zone>;

@Schema()
export class Zone {
    
  @Prop()
  nom: string;

  @Prop()
  nombreBenevolesNecessaire: string;
}

export const ZoneSchema = SchemaFactory.createForClass(Zone);
