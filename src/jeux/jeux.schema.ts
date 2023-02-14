import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JeuxDocument = HydratedDocument<Jeux>;

@Schema()
export class Jeux {
    
  @Prop()
  nom: string;

  @Prop()
  type: string;
}

export const JeuxSchema = SchemaFactory.createForClass(Jeux);
