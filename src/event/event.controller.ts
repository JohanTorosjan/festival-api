import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateEventDto } from './event.create.dto';
import { EventService } from './event.service';

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

        @Delete()
        deleteAll(){
            return this.eventService.deleteAll()
        }

        @Put(':id')
        update(@Param('id') id: string,@Body() updateEventDto: CreateEventDto,) {
            return this.eventService.updateEvent(id, updateEventDto);
        }
    
    

    
}
