import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
        



    async create(createEventDto: CreateEventDto) {
        const createdEvent = new this.eventModel(createEventDto);
        try{
            await createdEvent.save();
            return createdEvent;
        }
        catch(error){
            throw new InternalServerErrorException()
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
    
}
