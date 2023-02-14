import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateZoneDto } from './zone.create.dto';
import { Zone, ZoneDocument } from './zone.schema';
import { AddZoneDto } from './addzone.jeux.dto';

@Injectable()
export class ZoneService {



    constructor(
        @InjectModel(Zone.name) private readonly zoneModel: Model<ZoneDocument>
        ) 
        {}


    addGame(id: string, addZoneDto: AddZoneDto) {
        let a=this.zoneModel.updateOne(
            { _id: id },
            { $push: { jeux: addZoneDto } }
        )
        console.log(a)
        return a;

    }
    
    async create(createZoneDTO: CreateZoneDto) {
        try{
            const {nom,jeux} = createZoneDTO;
            const zone = new this.zoneModel({
            nom,
            jeux});

            await zone.save();
            return zone;
            } catch (error) {
            throw new InternalServerErrorException();
            }
       
    }
    

    async getAll(){

        return this.zoneModel.find().populate('jeux');
    }
}
