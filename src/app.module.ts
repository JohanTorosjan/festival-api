import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BenevoleModule } from './benevole/benevole.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JeuxModule } from './jeux/jeux.module';
import { ZoneModule } from './zone/zone.module';
import { EventModule } from './event/event.module';
import { FestivalModule } from './festival/festival.module';
import { JourDeFestivalModule } from './jour-de-festival/jour-de-festival.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: 
  [
    MongooseModule.forRoot('mongodb+srv://admin:admin@festivalapi.0zi1utg.mongodb.net/?retryWrites=true&w=majority'),
    ConfigModule.forRoot(),
    AuthModule,
    BenevoleModule,
    JeuxModule,
    ZoneModule,
    EventModule,
    FestivalModule,
    JourDeFestivalModule,
    AuthModule,
  ],
})
export class AppModule {}
