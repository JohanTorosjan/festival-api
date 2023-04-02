import { Benevole } from "src/benevole/schemas/benevole.schema";
import { Zone } from "src/zone/zone.schema";

export class addEventJourDTO{
    _id:String
    beginingdate:Date;
    endingdate:Date;
    zone: Zone
    benevoles:[Benevole]
}