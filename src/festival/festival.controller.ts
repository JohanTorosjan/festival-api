import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateFestivalDTO } from './create.festival.dto';
import { FestivalService } from './festival.service';
import { AddFestivalDto } from './addfestival.zone.dto';
import { CreateJourDeFestivalDto } from 'src/jour-de-festival/jour-de-festival.create.dto';
import { addJourDeFestivalDTO } from 'src/jour-de-festival/add-jour-de-festival.dto';

@Controller('festival')
export class FestivalController {
    constructor(private readonly festivalService:FestivalService){}

    @Get()
    getAll(){
        return this.festivalService.getAll();
    }

    @Get(':id')
    getById(@Param('id')id:string){
        return this.festivalService.getById(id)
    }

    @Post()
    create(@Body() createFestivalDTO:CreateFestivalDTO){
        return this.festivalService.create(createFestivalDTO)
    }
    
    @Put('/addZone/:id')
    addToFestival(@Param('id')id:string,@Body()addFestivalDto:AddFestivalDto){
       return this.festivalService.addZone(id,addFestivalDto)
    }

    @Put('/addJour/:id')
    addJour(@Param('id')id:string,@Body()jourDeFestivalDTO:addJourDeFestivalDTO){
       return this.festivalService.addJour(id,jourDeFestivalDTO)
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.festivalService.delete(id)
    }


    @Put(':id')
    update(@Param('id') id: string,@Body() updateFestivalDto: CreateFestivalDTO,) {
        return this.festivalService.updateFestival(id, updateFestivalDto);
    }


    @Get('/jour/:id')
    getJours(@Param('id') id:string){
        return this.festivalService.getJours(id)
    }
    

    @Get('/zones/:id')
    getZones(@Param('id')id: string){
        return this.festivalService.getZones(id)
    }


    @Put('associateZone/:id')
    associateZone(@Param('id') id: string) {
        return this.festivalService.associateZone(id)
    }



}

