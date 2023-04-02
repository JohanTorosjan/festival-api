import { Event } from "src/event/event.schema"
export class addJourDeFestivalDTO{
    _id:String
    nom:String
    begining:String
    ending:String
    creneaux:[Event]
}