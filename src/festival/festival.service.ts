import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { AddFestivalDto } from './addfestival.zone.dto';
import { CreateFestivalDTO } from './create.festival.dto';
import { Festival, FestivalDocument } from './festival.schema';

@Injectable()
export class FestivalService {




    constructor(
        @InjectModel(Festival.name) private readonly festivalModel: Model<FestivalDocument>
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
      
    

    addZone(id: string, addFestivalDto: AddFestivalDto) {
        let updated=this.festivalModel.updateOne(
            { _id: id },
            { $push: { zone: addFestivalDto } }
        )
        console.log(updated)
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
        return this.festivalModel.find();
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
}
