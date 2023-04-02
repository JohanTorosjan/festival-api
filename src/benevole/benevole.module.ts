import { Module } from '@nestjs/common';
import { BenevoleController } from './benevole.controller';
import { BenevoleService } from './benevole.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Benevole, BenevoleSchema } from './schemas/benevole.schema';

@Module({imports: 
    [
        MongooseModule.forFeature([{ name: Benevole.name, schema: BenevoleSchema }])
],
    controllers: [BenevoleController],
    providers: [BenevoleService],
    exports: [BenevoleService]
})
export class BenevoleModule {}
