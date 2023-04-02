import { Body,Req, Controller,Get,HttpCode, Param, Post, Put, Delete} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BenevoleService } from './benevole.service';
import { CreateBenevoleDTO } from './create.benevole.dto';

@Controller('benevole')
export class BenevoleController {

    constructor(private readonly benevoleService: BenevoleService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    me(@Req() request) {
        const benevoleEmail = request.user.benevoleEmail;
        return this.benevoleService.findByEmail(benevoleEmail);
    }

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
    @Get()
    ReadAll(){
        return this.benevoleService.getAllBenevole()
    }

    /**
     * Gets a specific benevole
     * @param id the id of the wanted benevole
     * @returns the benevole matching the id, or 404 not found error 
     */
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

    @Delete()
    deleteAll(){
        return this.benevoleService.deleteAll();
    }

   
}
