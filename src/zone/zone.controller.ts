import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateZoneDto } from './zone.create.dto';
import { ZoneService } from './zone.service';

@Controller('zone')
export class ZoneController {
    constructor(private readonly zoneService:ZoneService){}

    @Get()
    getAll(){
        return this.zoneService.getAll();
    }

    @Get(':id')
    getById(@Param('id')id:string){
        return this.zoneService.getById(id)
    }

    @Post()
    create(@Body() createZoneDTO:CreateZoneDto){
        return this.zoneService.create(createZoneDTO)
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.zoneService.delete(id)
    }


    @Put(':id')
    update(@Param('id') id: string,@Body() updateZoneDto: CreateZoneDto,) {
        return this.zoneService.updateZone(id, updateZoneDto);
    }

}

