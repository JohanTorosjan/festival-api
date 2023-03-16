import { Module } from '@nestjs/common';
import { BenevoleModule } from './benevole/benevole.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JeuxModule } from './jeux/jeux.module';
import { ZoneModule } from './zone/zone.module';
import { EventModule } from './event/event.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthStrategy } from './auth/auth.strategy';


@Module({
  imports: 
  [MongooseModule.forRoot(process.env.DATABASE_URL)
  ,
  BenevoleModule,
  JeuxModule,
  ZoneModule,
  EventModule],
  controllers: [ AppController ],
  providers: [ AppService, AuthStrategy ]
 
})
export class AppModule {}
