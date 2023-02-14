import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateJeuxDto } from './create.jeux.dto';
import { Jeux, JeuxDocument } from './jeux.schema';

@Injectable()
export class JeuxService {
    constructor(@InjectModel(Jeux.name) private readonly jeuxModel:Model<JeuxDocument>
    ){}
    
    private checkid(id:string){
        if (!isValidObjectId(id)){
            throw new NotFoundException(`No Jeux with this id: ${id}`);
        }
    }
    async createJeux(createJeuxDto: CreateJeuxDto) {
        try{
            const {nom,type} = createJeuxDto;
            const benevole = new this.jeuxModel({
            nom,
            type});

            await benevole.save();
            return benevole;
            } catch (error) {
            throw new InternalServerErrorException();
            }
    }

    async getAll(){
        try{
            const allJeux = await this.jeuxModel.find({});
            return allJeux;
        }
        catch(error){
            throw new InternalServerErrorException();
        }
    }
    async update(id:string,createJeuxDto:CreateJeuxDto){
        this.checkid(id)
        const body ={...createJeuxDto}
        const update=await this.jeuxModel.updateOne({_id:id},body)
        if(update.matchedCount==1){
            if(update.modifiedCount==1){
                return {message:"Success"};
            }
            return {message:"Already updated"};
        }
        throw new InternalServerErrorException();
    }

    async delete(id:string){
        this.checkid(id)
        const deleted=await this.jeuxModel.deleteOne({_id:id});
        if(deleted.deletedCount==1){
            return {message:"Success"};
        }
        throw new NotFoundException(`No Jeux with this id: ${id}`);
    }

    async getById(id:string){
        this.checkid(id)
        const jeux=await this.jeuxModel.findById(id)
        if(!jeux){
            throw new NotFoundException(`No jeux with this id: ${id}`);
        }
        return jeux;
    }

  
}
