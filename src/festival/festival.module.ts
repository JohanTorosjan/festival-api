import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { JeuxModule } from 'src/jeux/jeux.module';
import { Festival,FestivalSchema } from './festival.schema';
import { FestivalController } from './festival.controller';
import { FestivalService } from './festival.service';
import { Zone, ZoneSchema } from 'src/zone/zone.schema';
import { JourDeFestival, JourFestivalSchema } from 'src/jour-de-festival/jour-de-festival.schema';

@Module({imports:
    [
        MongooseModule.forFeature([{
            name:Festival.name,
            schema:FestivalSchema
        },
    {
        name:Zone.name,
        schema:ZoneSchema
    },
    {
        name:JourDeFestival.name,
        schema: JourFestivalSchema
    }
])
        ,
    ], controllers: [FestivalController], providers: [FestivalService],
})
export class FestivalModule {}
