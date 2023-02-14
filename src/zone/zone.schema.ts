import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Jeux } from 'src/jeux/jeux.schema';
import { Type } from 'class-transformer';


export type ZoneDocument = HydratedDocument<Zone>;

@Schema()
export class Zone {
    
  @Prop()
  nom: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref:Jeux.name }] })
  @Type(() => Jeux)
  jeux: [Jeux];

}

export const ZoneSchema = SchemaFactory.createForClass(Zone);
