import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JeuxModule } from 'src/jeux/jeux.module';
import { Festival,FestivalSchema } from './festival.schema';
import { FestivalController } from './festival.controller';
import { FestivalService } from './festival.service';

@Module({imports:
    [
        MongooseModule.forFeature([{
            name:Festival.name,
            schema:FestivalSchema
        }])
        ,JeuxModule
    ], controllers: [FestivalController], providers: [FestivalService],
})
export class FestivalModule {}
