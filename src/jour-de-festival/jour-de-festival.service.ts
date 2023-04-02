import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Schema, SchemaType } from 'mongoose';
import { CreateEventDto } from 'src/event/event.create.dto';
import { Event,EventDocument } from 'src/event/event.schema';
import { Festival, FestivalDocument } from 'src/festival/festival.schema';
import { Zone, ZoneDocument } from 'src/zone/zone.schema';
import { CreateJourDeFestivalDto } from './jour-de-festival.create.dto';
import { JourDeFestival ,JourDeFestivalDocument} from './jour-de-festival.schema';
@Injectable()
export class JourDeFestivalService {

    constructor(
        @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
        @InjectModel(JourDeFestival.name) private readonly jourDeFestivalModel: Model<JourDeFestivalDocument>,
        @InjectModel(Zone.name) private readonly zoneModel: Model<ZoneDocument>
        ) 
        {}
        
    private checkid(id:string){
        if (!isValidObjectId(id)){
            throw new NotFoundException(`No jourDeFestivals with this id: ${id}`);
        }
    }

    private makeCreneaux(b:Date,e:Date){
        console.log(b);
        console.log(e);
        
        let dateDebut=new Date(b)
        let dateFin=new Date(e)


        dateDebut.setHours(dateDebut.getHours()+2)
        dateFin.setHours(dateFin.getHours()+2)

        console.log(dateDebut);
        console.log(dateFin);
        
        

        const creneaux: Array<Array<Date>> = [];
        let creneauDebut = new Date(dateDebut.getTime());
        while (creneauDebut.getTime() < dateFin.getTime()) 
        {
            const creneauFin = new Date(creneauDebut.getTime() + 2 * 60 * 60 * 1000);
            creneaux.push([creneauDebut, creneauFin]);
            creneauDebut = creneauFin;
        }

        return creneaux;
        }



    async create(createJourDeFestivalDto: CreateJourDeFestivalDto) {
        
       
        let creneaux=[];
        const creneauxMaker=this.makeCreneaux(createJourDeFestivalDto.begining,createJourDeFestivalDto.ending)
        let benevoles=[]



        let zone = await this.zoneModel.findOne({nom:"Free"});

        console.log(creneauxMaker)
        for(let i=0;i<creneauxMaker.length;i++){
            let beginingdate=creneauxMaker[i][0]
            let endingdate=creneauxMaker[i][1]
            let event = new this.eventModel({
                beginingdate,
                endingdate,
                zone,
                benevoles
            });
            try{
                await event.save();
                creneaux.push(event);
                }
            catch (error) {
                console.log(error)
                throw new InternalServerErrorException();
            }
        }


        let b = new Date(createJourDeFestivalDto.begining)
        b.setHours(b.getHours()+2)
        createJourDeFestivalDto.begining = b
        let e = new Date(createJourDeFestivalDto.ending)
        e.setHours(e.getHours()+2)
        createJourDeFestivalDto.ending = e
        let {nom, begining, ending}=createJourDeFestivalDto
       
        console.log(begining)
       const jourDeFestival = new this.jourDeFestivalModel({nom,begining,ending,creneaux });
       console.log(jourDeFestival);
       

        try{
            await jourDeFestival.save();
            return jourDeFestival;
            }
        catch (error) {
            console.log(error)
            throw new InternalServerErrorException();
        }
    }


    async getAll() {
        return this.jourDeFestivalModel.find().populate("creneaux");
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



   async updateJourDeFestival(id: string, updateJourDeFestivalDto: CreateJourDeFestivalDto) {
       this.checkid(id)
       /*
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
        */
    }

    async getEvent(id: string) {
        //const jourDeFestival = await this.jourDeFestivalModel.findById(id).populate('creneaux')
       
        const jourDeFestival = await this.jourDeFestivalModel.findById(id).populate({ 
            path: 'creneaux',
            populate: {
              path: 'zone',
              model: 'Zone'
            },
         })
        return jourDeFestival.creneaux
       
    }
    

}
