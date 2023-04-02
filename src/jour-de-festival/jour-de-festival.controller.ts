import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateJourDeFestivalDto } from './jour-de-festival.create.dto';
import { JourDeFestivalService } from './jour-de-festival.service';

@Controller('jourDeFestival')
export class JourDeFestivalController {
    constructor(private readonly jourDeFestivalService: JourDeFestivalService){}

        @Post()
        Create(@Body()createJourDeFestivalDto:CreateJourDeFestivalDto){
            console.log(createJourDeFestivalDto);
            return this.jourDeFestivalService.create(createJourDeFestivalDto)
        }

        @Get()
        GetAll(){
            return this.jourDeFestivalService.getAll();
        }

        @Get(':id')
        getById(@Param('id')id:string){
            return this.jourDeFestivalService.getById(id)
        }

        @Delete(':id')
        delete(@Param('id') id:string){
            return this.jourDeFestivalService.delete(id)
        }

        @Delete()
        deleteAll(){
            return this.jourDeFestivalService.deleteAll();
        }

        @Put(':id')
        update(@Param('id') id: string,@Body() updateJourDeFestivalDto: CreateJourDeFestivalDto,) {
            return this.jourDeFestivalService.updateJourDeFestival(id, updateJourDeFestivalDto);
        }
    
    

    
}
