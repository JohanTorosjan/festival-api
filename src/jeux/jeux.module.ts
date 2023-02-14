import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JeuxController } from './jeux.controller';
import { Jeux,JeuxSchema } from './jeux.schema';
import { JeuxService } from './jeux.service';
import { Zone,ZoneSchema } from 'src/zone/zone.schema';
@Module({imports:
    [
        MongooseModule.forFeature([{
            name:Jeux.name,
            schema:JeuxSchema
        }]), MongooseModule.forFeature([{
            name:Zone.name,
            schema:ZoneSchema
        }])
    ],
    
    controllers:[JeuxController]
    ,
    providers:[JeuxService],

})
export class JeuxModule {
}
