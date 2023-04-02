import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BenevoleModule } from 'src/benevole/benevole.module';
import { ZoneModule } from 'src/zone/zone.module';
import { Event,EventSchema } from './event.schema';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Festival, FestivalSchema } from 'src/festival/festival.schema';
import { JourDeFestival, JourFestivalSchema } from 'src/jour-de-festival/jour-de-festival.schema';
import { JourDeFestivalService } from 'src/jour-de-festival/jour-de-festival.service';

@Module({imports:
    [
        MongooseModule.forFeature([{
            name:Event.name,
            schema:EventSchema
        },
    {
        name:Festival.name,
        schema:FestivalSchema

    },
    {
        name:JourDeFestival.name,
        schema:JourFestivalSchema
    }])
        ,BenevoleModule
        ,ZoneModule
    ], providers: [EventService], controllers: [EventController]
})
export class EventModule {}
