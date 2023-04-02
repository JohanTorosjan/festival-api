import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Schema, SchemaType } from 'mongoose';
import { AddFestivalDto } from 'src/festival/addfestival.zone.dto';
import { Festival, FestivalDocument } from 'src/festival/festival.schema';
import { addJourDeFestivalDTO } from 'src/jour-de-festival/add-jour-de-festival.dto';
import { JourDeFestival, JourDeFestivalDocument } from 'src/jour-de-festival/jour-de-festival.schema';
import { AddBenevoleDTO } from './event.addbenevole.dto';
import { CreateEventDto } from './event.create.dto';
import { Event ,EventDocument} from './event.schema';
import { updateZoneDTO } from './event.updatezone.dto';
@Injectable()
export class EventService {

    
    constructor(
        @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
        @InjectModel(Festival.name) private readonly festivalModel: Model<FestivalDocument>,
        @InjectModel(JourDeFestival.name) private readonly jourDeFestivalModel: Model<JourDeFestivalDocument>,
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
        this.eventModel.find().populate('benevoles').populate('zone');
        
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



    async addBenevoles(id: string, addBenevoleDTO: AddBenevoleDTO) {
        this.checkid(id)
        let updated=await this.eventModel.updateOne(
            { _id: id },
            { $push: {benevoles: addBenevoleDTO } }
        )
        return {message:"success"}
    }


    async getBenevoles(id:string){
        const event = await this.eventModel.findById(id).populate('benevoles');
        return event.benevoles
   // return await this.eventModel.find({benevoles:id}).populate("benevoles")
    }


    async deleteAffectation(idE: string, addBenevoleDTO: AddBenevoleDTO) {
        this.checkid(idE)      
        try{
            const event = await this.eventModel.findById(idE);
            const benevoleArray=event.benevoles
            const index = benevoleArray.findIndex((id: any) => id.toString() === addBenevoleDTO._id.toString());
            if (index !== -1) {
                benevoleArray.splice(index, 1);
            }
            event.benevoles=benevoleArray
            await event.save();
            return {message:"Success"};
        }
        
        catch{
            console.log("aa");
            throw new InternalServerErrorException()
        }
    
    }

    async associateZone(id: string) {
        let festival = await this.festivalModel.findById(id).populate('zones').populate({ 
            path: 'jours',
            populate: {
                path: 'creneaux',
                model: 'Event'
            } 
        }).exec();
        let zone = festival.zones[0]
        for(let i=0;i<festival.jours.length;i++){
            let jourDeFestival = await this.jourDeFestivalModel.findOne(festival.jours[i])
            let events=festival.jours[i].creneaux
            for(let j=0;j<events.length;j++){
               // festival.jours[i].creneaux[j].zone = festival.zones[0]
                let event = await this.eventModel.findOne(events[j])
                event.zone=zone
                let updatedevent = await event.save()
                jourDeFestival.creneaux[j] = updatedevent
                let updatedJdF = await jourDeFestival.save()
                festival.jours[i] = updatedJdF
                await festival.save()
            }
        }
        return await festival.save() 
    }

    

    async deleteAffectationAdmin(idE: string, addBenevoleDTO: AddBenevoleDTO) {
        this.checkid(idE)      
        try{
            const event = await this.eventModel.findById(idE);
            
            let jourDeFestival = await this.jourDeFestivalModel.findOne({creneaux:event}).populate({ 
                path: 'creneaux',
                populate: {
                    path: 'benevoles',
                    model: 'Benevole'
                } 
            })
            
           
            console.log(event)
            console.log(jourDeFestival);

            const benevoleArray=event.benevoles
            const index = benevoleArray.findIndex((id: any) => id.toString() === addBenevoleDTO._id.toString());
            if (index !== -1) {
                benevoleArray.splice(index, 1);
            }
            event.benevoles=benevoleArray
            console.log(event);
            
            // this.eventModel.updateOne({
            //      _id: event._id },
            //      {$pull: { benevoles: { benevoles: addBenevoleDTO} } })
            // console.log(event);
            
            // const benevoleArray = event.benevoles
            // const index = benevoleArray.findIndex((id: any) => id.toString() === addBenevoleDTO._id.toString());
            // if (index !== -1) {
            //     benevoleArray.splice(index, 1);
            // }
         
             await event.save();

             
            // return {message:"Success"};
        }
        catch{
            console.log("aa");
            throw new InternalServerErrorException()
        }
    }

    async updateZone(id: string, newZone: updateZoneDTO) {
        this.checkid(id)
        const event = await this.eventModel.findById(id).exec()
        event.zone = newZone
        return await event.save()
    }
    



}
