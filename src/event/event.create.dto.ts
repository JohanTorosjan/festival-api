import mongoose from "mongoose";
import { Benevole } from "src/benevole/schemas/benevole.schema";
import { Zone } from "src/zone/zone.schema";

export class CreateEventDto{
    beginingdate:Date;
    endingdate:Date;
    zone: Zone
    benevoles:[Benevole]
}

