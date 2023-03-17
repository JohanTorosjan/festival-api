import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BenevoleModule } from 'src/benevole/benevole.module';
import { ZoneModule } from 'src/zone/zone.module';
import { JourDeFestival,JourFestivalSchema } from './jour-de-festival.schema';
import { JourDeFestivalService } from './jour-de-festival.service';
import { JourDeFestivalController } from './jour-de-festival.controller';

@Module({imports:
    [
        MongooseModule.forFeature([{
            name:JourDeFestival.name,
            schema:JourFestivalSchema
        }])
        ,BenevoleModule
        ,ZoneModule
    ], providers: [JourDeFestivalService], controllers: [JourDeFestivalController],
})
export class JourDeFestivalModule {}
