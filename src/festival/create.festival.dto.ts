import { Zone } from "../zone/zone.schema";

export class CreateFestivalDTO{
    nom:string;
    annee:number;
    nombreDeJours:number;
    zones: [Zone];
}