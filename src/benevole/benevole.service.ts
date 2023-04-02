import { HttpException, Injectable, InternalServerErrorException, NotFoundException, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, ObjectId } from 'mongoose';
import { Benevole ,BenevoleDocument} from './schemas/benevole.schema';
import { CreateBenevoleDTO } from './create.benevole.dto';




@Injectable()
export class BenevoleService {
    constructor(
        @InjectModel(Benevole.name) private readonly benevoleModel: Model<BenevoleDocument>
        ) 
        {}


    private checkid(id:string){
        if (!isValidObjectId(id)){
            throw new NotFoundException(`No benevole with this id: ${id}`);
        }
    }

    /**
     * Creates a new benevole
     */
    async createBenevole(createBenevoleDTO:CreateBenevoleDTO):Promise<Benevole>{
        console.log(createBenevoleDTO)
        try{
            const {prenom,nom,email, password} = createBenevoleDTO;
            const benevole = new this.benevoleModel({
            prenom,
            nom,
            email,
            password});
            await benevole.save();
            return benevole;
            } catch (error) {
            throw new InternalServerErrorException();
            }
    }

    /**
     * Gets all benevoles
     */
    async getAllBenevole():Promise<Benevole[]>{
        try{
            const allBrevoles = await this. benevoleModel.find({});
            return allBrevoles;
        }
        catch(error){
            throw new InternalServerErrorException();
        }
    }


    /**
     * 
     * @param id the id of the benevole
     * @returns the benevole corresponding or null 
     */
    async getBenevole(id:string):Promise<Benevole>{
        this.checkid(id);
        const benevole=await this.benevoleModel.findById(id)
        if(!benevole){
            throw new NotFoundException(`No benevole with this id: ${id}`);
        }
        return benevole;

    }
    /**
     * updates a benevole
     * @param id The id of the benevole
     * @param createBenevoleDTO The updated benevole
     * @returns 
     */
    async update(id:string,createBenevoleDTO:CreateBenevoleDTO){
        this.checkid(id)
        const body ={...createBenevoleDTO}
        const update=await this.benevoleModel.updateOne({_id:id},body)
        if(update.matchedCount==1){
            if(update.modifiedCount==1){
                return {message:"Success"};
            }
            return {message:"Already updated"};
        }
        throw new InternalServerErrorException();
    }

    async deleteAll() {
        return this.benevoleModel.deleteMany();
    }

    /**
     * deletes a benevole
     * @param id the id of the benevole to delete
     * @returns Success message or error
     */
    async delete(id:string){
        this.checkid(id)
        const deleted=await this.benevoleModel.deleteOne({_id:id});
        if(deleted.deletedCount==1){
            return {message:"Success"};
        }
        throw new NotFoundException(`No benevole with this id: ${id}`);
    }

    async findByEmail(email: string) {
        const benevole = await this.benevoleModel.findOne({ email }).exec();
        return benevole;
    }

    async login(email: string, password: string) {
        const benevole = await this.findByEmail(email);
        console.log(benevole);
        
        if (!benevole) {
            return undefined;
        }
        if (benevole.password !== password) {
            return undefined;
        }
        return benevole;
    }
}
