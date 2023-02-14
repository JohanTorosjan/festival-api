import { Jeux } from "src/jeux/jeux.schema";

export class CreateZoneDto{
    nom:string;
    jeux:[Jeux]
}