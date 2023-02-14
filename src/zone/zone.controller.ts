import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateZoneDto } from './zone.create.dto';
import { ZoneService } from './zone.service';
import { AddZoneDto } from './addzone.jeux.dto';
@Controller('zone')
export class ZoneController {
    constructor(private readonly zoneService:ZoneService){}

    @Get()
    getAll(){
        return this.zoneService.getAll();
    }

    @Post()
    create(@Body() createZoneDTO:CreateZoneDto){
        return this.zoneService.create(createZoneDTO)
    }
    
    @Put('/addGame/:id')
    addToZone(@Param('id')id:string,@Body()addZoneDto:AddZoneDto){
       return this.zoneService.addGame(id,addZoneDto)
    }
}

