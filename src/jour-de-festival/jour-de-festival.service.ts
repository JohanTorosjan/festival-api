import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Schema, SchemaType } from 'mongoose';
import { CreateJourDeFestivalDto } from './jour-de-festival.create.dto';
import { JourDeFestival ,JourDeFestivalDocument} from './jour-de-festival.schema';
@Injectable()
export class JourDeFestivalService {
    
    constructor(
        @InjectModel(JourDeFestival.name) private readonly jourDeFestivalModel: Model<JourDeFestivalDocument>
        ) 
        {}
        
    private checkid(id:string){
        if (!isValidObjectId(id)){
            throw new NotFoundException(`No jourDeFestivals with this id: ${id}`);
        }
    }



    async create(createJourDeFestivalDto: CreateJourDeFestivalDto) {
        const {nom, begining, ending ,creneaux }=createJourDeFestivalDto
        const jourDeFestival = new this.jourDeFestivalModel({ nom, begining, ending ,creneaux });
        try{
            await jourDeFestival.save();
            return jourDeFestival;
            }
        catch (error) {
            throw new InternalServerErrorException();
        }
    }


    async getAll() {
        return this.jourDeFestivalModel.find();
    }

    async getById(id:string){
        this.checkid(id)
        const jourDeFestival = await this.jourDeFestivalModel.findById(id)
        if(!jourDeFestival){
            throw new NotFoundException(`No jourDeFestival with this id: ${id}`);
        }
        return jourDeFestival;
    }

    async delete(id: string) {
        this.checkid(id)
        const deleted=await this.jourDeFestivalModel.deleteOne({_id:id});
        if(deleted.deletedCount==1){
            return {message:"Success"};
        }
        throw new NotFoundException(`No jourDeFestivals with this id: ${id}`);
    }

    async deleteAll() {
        return this.jourDeFestivalModel.deleteMany();
    }


   async updateJourDeFestival(id: string, updateJourDeFestivalDto: CreateJourDeFestivalDto) {
       this.checkid(id)
       const existingJourDeFestival = await this.jourDeFestivalModel.findById(id).exec();
        if (!existingJourDeFestival) {
          throw new NotFoundException(`JourDeFestival ${id} not found`);
        }
    
        if (updateJourDeFestivalDto.nom) {
            existingJourDeFestival.nom = updateJourDeFestivalDto.nom;
        }
        if (updateJourDeFestivalDto.begining) {
            existingJourDeFestival.begining = updateJourDeFestivalDto.begining;
        }
        if (updateJourDeFestivalDto.ending) {
            existingJourDeFestival.ending = updateJourDeFestivalDto.ending;
        }
        if (updateJourDeFestivalDto.creneaux) {
            existingJourDeFestival.creneaux = updateJourDeFestivalDto.creneaux;
        }
        const updatedJourDeFestival = await existingJourDeFestival.save();
        return updatedJourDeFestival.toObject({ getters: true });
    }

}
