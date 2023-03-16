import { Module } from '@nestjs/common';
import { BenevoleController } from './benevole/benevole.controller';
import { BenevoleService } from './benevole/benevole.service';
import { BenevoleModule } from './benevole/benevole.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JeuxController } from './jeux/jeux.controller';
import { JeuxService } from './jeux/jeux.service';
import { JeuxModule } from './jeux/jeux.module';
import { ZoneModule } from './zone/zone.module';
import { EventModule } from './event/event.module';


@Module({
  imports: 
  [MongooseModule.forRoot('mongodb+srv://admin:admin@festivalapi.0zi1utg.mongodb.net/?retryWrites=true&w=majority')
  ,
  BenevoleModule,
  JeuxModule,
  ZoneModule,
  EventModule],
})
export class AppModule {}
