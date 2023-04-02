import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JourDeFestival,JourFestivalSchema } from './jour-de-festival.schema';
import { JourDeFestivalService } from './jour-de-festival.service';
import JourDeFestivalController from './jour-de-festival.controller';
import { EventModule } from 'src/event/event.module';
import { EventSchema } from 'src/event/event.schema';
import { Festival, FestivalSchema } from 'src/festival/festival.schema';
import { Zone, ZoneSchema } from 'src/zone/zone.schema';


@Module({imports:
    [
        MongooseModule.forFeature([{
            name:JourDeFestival.name,
            schema:JourFestivalSchema
        },
        {
            name:Event.name,
            schema:EventSchema
        },
        {
        name:Zone.name,
        schema:ZoneSchema
        }
    ])
    ,EventModule]
    , providers: [JourDeFestivalService], controllers: [JourDeFestivalController],
})
export class JourDeFestivalModule {}
