import { Body,Req, Controller,Get,HttpCode, Param, Post, Put, Delete, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { BenevoleService } from './benevole.service';
import { CreateBenevoleDTO } from './create.benevole.dto';

@Controller('benevole')
export class BenevoleController {

    constructor(private readonly benevoleService: BenevoleService) {}

    /**
     * Creates a benevole
     * @param createBenevoleDTO The benevole to create
     * @returns the benevole created
     */
    @Post()
    Create(@Body() createBenevoleDTO:CreateBenevoleDTO) {
        return this.benevoleService.createBenevole(createBenevoleDTO);
    }

    /**
     * Get all the benevoles
     * @returns Benevole[]
     */
    @UseGuards(AuthGuard('jwt'))
    @Get()
    ReadAll(){
        return this.benevoleService.getAllBenevole()
    }

    /**
     * Gets a specific benevole
     * @param id the id of the wanted benevole
     * @returns the benevole matching the id, or 404 not found error 
     */
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getName(@Param('id') id: string) {
        return this.benevoleService.getBenevole(id);
      }

      /**
       * 
       * @param id The id of the benevole to update
       * @param createBenevoleDTO the benevole updated
       * @returns success message or error
       */
    @Put(':id')
    update(@Param('id')id:string,@Body() createBenevoleDTO: CreateBenevoleDTO){
        return this.benevoleService.update(id,createBenevoleDTO)
    }

    /**
     * 
     * @param id the id of the benevole to delete
     * @returns succeess message or error
     */
    @Delete(':id')
    delete(@Param('id')id:string){
        return this.benevoleService.delete(id)
    }



   
}
