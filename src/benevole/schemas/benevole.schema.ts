import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BenevoleDocument = HydratedDocument<Benevole>;

@Schema()
export class Benevole {
    
  @Prop()
  prenom: string;

  @Prop()
  nom: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const BenevoleSchema = SchemaFactory.createForClass(Benevole);
