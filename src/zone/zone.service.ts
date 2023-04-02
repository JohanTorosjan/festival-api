import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateZoneDto } from './zone.create.dto';
import { Zone, ZoneDocument } from './zone.schema';

@Injectable()
export class ZoneService {




    constructor(
        @InjectModel(Zone.name) private readonly zoneModel: Model<ZoneDocument>
        ) 
        {}
   
   
    private checkid(id:string){
        if (!isValidObjectId(id)){
            throw new NotFoundException(`No Zone with this id: ${id}`);
        }
    }


    async updateZone(id: string, createZoneDTO: CreateZoneDto): Promise<Zone> {
        this.checkid(id)
        const existingZone = await this.zoneModel.findById(id).exec();
        if (!existingZone) {
          throw new NotFoundException(`Zone ${id} not found`);
        }
      
        // Update zone properties
        if (createZoneDTO.nom) {
          existingZone.nom = createZoneDTO.nom;
        }
      
        const updatedZone = await existingZone.save();
        return updatedZone.toObject({ getters: true });
    }
    
    async create(createZoneDTO: CreateZoneDto) {
        try{
            const {nom, nombreBenevolesNecessaire} = createZoneDTO;
            const zone = new this.zoneModel({ nom, nombreBenevolesNecessaire });

            await zone.save();
            return zone;
            } catch (error) {
            throw new InternalServerErrorException();
            }
       
    }
    

    async getAll():Promise<Zone[]>{
        try{
            const allzones = await this. zoneModel.find({});
            return allzones;
        }
        catch(error){
            throw new InternalServerErrorException();
        }
    }


    async delete(id:string){
        this.checkid(id)
        const deleted=await this.zoneModel.deleteOne({_id:id});
        if(deleted.deletedCount==1){
            return {message:"Success"};
        }
        throw new NotFoundException(`No Zone with this id: ${id}`);
    }

    async getById(id:string){
        this.checkid(id)
        const zone = await this.zoneModel.findById(id)
        if(!zone){
            throw new NotFoundException(`No zone with this id: ${id}`);
        }
        return zone;
    }
}
