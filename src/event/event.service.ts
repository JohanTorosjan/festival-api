import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Schema, SchemaType } from 'mongoose';
import { CreateEventDto } from './event.create.dto';
import { Event ,EventDocument} from './event.schema';
@Injectable()
export class EventService {


    

    
    constructor(
        @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>
        ) 
        {}
        
    private checkid(id:string){
        if (!isValidObjectId(id)){
            throw new NotFoundException(`No events with this id: ${id}`);
        }
    }



    async create(createEventDto: CreateEventDto) {
        const {beginingdate,endingdate,zone,benevoles}=createEventDto
        const event = new this.eventModel({
            beginingdate,
            endingdate,
            zone,
            benevoles});
        try{
            await event.save();
            return event;
            }
        catch (error) {
            throw new InternalServerErrorException();
        }
    }


    async getAll() {
        let event= 
        this.eventModel.find().populate('benevoles').populate({ 
            path: 'zone',
            populate: {
              path: 'jeux',
              model: 'Jeux'
            } 
         });
        
        return event;
    }

    async getById(id:string){
        this.checkid(id)
        const event = await this.eventModel.findById(id)
        if(!event){
            throw new NotFoundException(`No event with this id: ${id}`);
        }
        return event;
    }

    async delete(id: string) {
        this.checkid(id)
        const deleted=await this.eventModel.deleteOne({_id:id});
        if(deleted.deletedCount==1){
            return {message:"Success"};
        }
        throw new NotFoundException(`No events with this id: ${id}`);
    }

    async deleteAll() {
        return this.eventModel.deleteMany();
    }



   async updateEvent(id: string, updateEventDto: CreateEventDto) {
       this.checkid(id)
       const existingEvent = await this.eventModel.findById(id).exec();
        if (!existingEvent) {
          throw new NotFoundException(`Event ${id} not found`);
        }
    
        if (updateEventDto.beginingdate) {
            existingEvent.beginingdate = updateEventDto.beginingdate;
        }
        if (updateEventDto.endingdate) {
            existingEvent.endingdate = updateEventDto.endingdate;
        }
        if (updateEventDto.zone) {
            existingEvent.zone = updateEventDto.zone;
        }
        if (updateEventDto.benevoles) {
            existingEvent.benevoles = updateEventDto.benevoles;
        }      
        const updatedEvent = await existingEvent.save();
        return updatedEvent.toObject({ getters: true });
    }

}
