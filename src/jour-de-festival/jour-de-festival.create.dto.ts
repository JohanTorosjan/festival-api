import { Benevole } from "src/benevole/schemas/benevole.schema";
import { Event } from "src/event/event.schema";
import { Zone } from "src/zone/zone.schema";
export class CreateJourDeFestivalDto{
    nom: String;
    begining:Date;
    ending:Date;
    //id_fest:String;
    //creneaux:[Event];
}

