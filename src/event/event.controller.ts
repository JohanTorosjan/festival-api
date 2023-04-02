import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AddBenevoleDTO } from './event.addbenevole.dto';
import { CreateEventDto } from './event.create.dto';
import { EventService } from './event.service';
import { updateZoneDTO } from './event.updatezone.dto';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService){}

        @Post()
        Create(@Body()createEventDto:CreateEventDto){
            console.log(createEventDto);
            return this.eventService.create(createEventDto)
        }

        @Get()
        GetAll(){
            return this.eventService.getAll();
        }

        @Get(':id')
        getById(@Param('id')id:string){
            return this.eventService.getById(id)
        }

        @Delete(':id')
        delete(@Param('id') id:string){
            return this.eventService.delete(id)
        }

        @Delete('/deleteAffectation/:id')
        deleteAffectation(@Param('id') id:string,@Body()addBenevoleDTO:AddBenevoleDTO){
            return this.eventService.deleteAffectation(id,addBenevoleDTO)
        }

        @Put(':id')
        update(@Param('id') id: string,@Body() updateEventDto: CreateEventDto,) {
            return this.eventService.updateEvent(id, updateEventDto);
        }

        @Put("/addBenevoles/:id")
        addBenevoles(@Param('id') id:string,@Body()addBenevoleDTO:AddBenevoleDTO){
            return this.eventService.addBenevoles(id,addBenevoleDTO)
        }

        @Get("/ListOfBenevoles/:id")
        getBenevoles(@Param('id') id:string){
            return this.eventService.getBenevoles(id)
        }

        @Put('associateZone/:id')
        associateZone(@Param('id') id: string) {
            return this.eventService.associateZone(id)
        }

        @Delete('/deleteAffectationAdmin/:id')
        deleteAffectationAdmin(@Param('id') id:string,@Body()addBenevoleDTO:AddBenevoleDTO){
            return this.eventService.deleteAffectationAdmin(id,addBenevoleDTO)
        }

        @Put("/updateZone/:id")
        updateZone(@Param('id') id:string,@Body()newZone:updateZoneDTO){
            return this.eventService.updateZone(id,newZone)
        }
    

    

    
}
