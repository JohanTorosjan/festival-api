import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateFestivalDTO } from './create.festival.dto';
import { FestivalService } from './festival.service';
import { AddFestivalDto } from './addfestival.zone.dto';

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

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.festivalService.delete(id)
    }

    @Delete()
    deleteAll(){
        return this.festivalService.deleteAll();
    }


    @Put(':id')
    update(@Param('id') id: string,@Body() updateFestivalDto: CreateFestivalDTO,) {
        return this.festivalService.updateFestival(id, updateFestivalDto);
    }

}

