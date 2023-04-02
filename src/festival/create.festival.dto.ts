import { Zone } from "../zone/zone.schema";

export class CreateFestivalDTO{
    nom:string;
    annee:string;
    nombreDeJours:number;
    zones: [Zone];
}