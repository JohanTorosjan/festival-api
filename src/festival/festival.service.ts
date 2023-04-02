import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { addJourDeFestivalDTO } from 'src/jour-de-festival/add-jour-de-festival.dto';
import { CreateJourDeFestivalDto } from 'src/jour-de-festival/jour-de-festival.create.dto';
import { JourDeFestival, JourDeFestivalDocument } from 'src/jour-de-festival/jour-de-festival.schema';
import { Zone, ZoneDocument } from 'src/zone/zone.schema';
import { AddFestivalDto } from './addfestival.zone.dto';
import { CreateFestivalDTO } from './create.festival.dto';
import { Festival, FestivalDocument } from './festival.schema';

@Injectable()
export class FestivalService {





    constructor(
        @InjectModel(Festival.name) private readonly festivalModel: Model<FestivalDocument>,
        @InjectModel(Zone.name) private readonly zoneModel: Model<ZoneDocument>,
        @InjectModel(JourDeFestival.name) private readonly jourDeFestivalModel: Model<JourDeFestivalDocument>,
        ) 
        {}
   
   
    private checkid(id:string){
        if (!isValidObjectId(id)){
            throw new NotFoundException(`No Festival with this id: ${id}`);
        }
    }


    async updateFestival(id: string, createFestivalDTO: CreateFestivalDTO): Promise<Festival> {
        this.checkid(id)
        const existingFestival = await this.festivalModel.findById(id).exec();
        if (!existingFestival) {
          throw new NotFoundException(`Festival ${id} not found`);
        }
      
        // Update festival properties
        if (createFestivalDTO.nom) {
          existingFestival.nom = createFestivalDTO.nom;
        }
      
        const updatedFestival = await existingFestival.save();
        return updatedFestival.toObject({ getters: true });
    }
      
    

    async addZone(id: string, addFestivalDto: AddFestivalDto) {
    
        let updated=this.festivalModel.updateOne(
            { _id: id },
            { $push: { zones: addFestivalDto } }
        )
        return updated;

    }


    
    async create(createFestivalDTO: CreateFestivalDTO) {
        try{
            const {nom, annee, nombreDeJours, zones} = createFestivalDTO;
            const festival = new this.festivalModel({ nom, annee, nombreDeJours, zones });

            await festival.save();
            return festival;
            } catch (error) {
            throw new InternalServerErrorException();
            }
       
    }
    

    async getAll(){
        return this.festivalModel.find().populate('zones').populate({ 
            path: 'jours',
            populate: {
              path: 'creneaux',
              model: 'Event'
            } 
         });
    }


    async delete(id:string){
        this.checkid(id)
        const deleted=await this.festivalModel.deleteOne({_id:id});
        if(deleted.deletedCount==1){
            return {message:"Success"};
        }
        throw new NotFoundException(`No Festival with this id: ${id}`);
    }

    async getById(id:string){
        this.checkid(id)
        const festival = await this.festivalModel.findById(id)
        if(!festival){
            throw new NotFoundException(`No festival with this id: ${id}`);
        }
        return festival;
    }



    async addJour(id: string, jourDeFestivalDTO: addJourDeFestivalDTO) {
        this.checkid(id)
        let festivalday = await this.jourDeFestivalModel.findById(jourDeFestivalDTO._id)
        let updated= await this.festivalModel.updateOne(
            { _id: id },
            { $push: { jours: festivalday } }
        )
        return festivalday;
    }


    async getJours(id: string) {

        this.checkid(id)
        const festival = await this.festivalModel.findById(id).populate({ 
            path: 'jours',
            populate: {
              path: 'creneaux',
              model: 'Event'
            } 
         });
        if(!festival){
            throw new NotFoundException(`No festival with this id: ${id}`);
        }

        return festival.jours

    }



    async getZones(id: string) {
        this.checkid(id)
        const festival = await this.festivalModel.findById(id).populate('zones')
        console.log(festival.zones)
        return festival.zones
    }


    async associateZone(id: string) {
        let festival = await this.festivalModel.findById(id).populate({ 
            path: 'jours',
            populate: {
                path: 'creneaux',
                model: 'Event'
            } 
        }).exec();


        let zone = festival.zones[0]

        for(let i=0;i<festival.jours.length;i++){
            let events=festival.jours[i].creneaux
            for(let j=0;j<events.length;j++){
                festival.jours[i].creneaux[j].zone = festival.zones[0]
            }
            //festival.jours[i].creneaux=events
        }
     //   const jourDeFestival = await this.jourDeFestivalModel.findById(id).populate('creneaux')
        
     console.log(festival);
    return festival.save() 
    }


}
