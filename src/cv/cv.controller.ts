import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {CvService} from "./cv.service";
import {CvEntity} from "./entities/cv.entity";
import {AddCvDto} from "./dto/add-cv.dto";
import {UpdateCvDto} from "./dto/update-cv.dto";

@Controller('cv')
export class CvController {

    constructor(private cvService: CvService) {
    }

    @Get()
    async getAllCvs(): Promise<CvEntity[]>{
        return await this.cvService.getCvs();
    }

    @Post()
    async addCv(@Body() addCvDto: AddCvDto): Promise<CvEntity> {
        return await this.cvService.AddCv(addCvDto)
    }

    @Patch(':id')
    async updateCv(
        @Body() updateCvDto: UpdateCvDto,
        @Param('id', ParseIntPipe) id: number
    ): Promise<CvEntity> {
        return await this.cvService.UpdateCv(id, updateCvDto)
    }

    @Patch()
    async updateCv2(@Body() updateObjet){
        const {updateCriteria, updateCvDto} = updateObjet
        return await this.cvService.UpdateCv2(updateCriteria, updateCvDto)
    }

    // @Delete(':id')
    // async removeCv(@Param('id', ParseIntPipe)id: number){
    //     return this.cvService.DeleteCv(id)
    // }


    // @Delete(':id')
    // async removeCv(@Param('id', ParseIntPipe)id: number){
    //     return this.cvService.RemoveCv(id)
    // }

    @Delete(':id')
    async softDeleteCv(@Param('id', ParseIntPipe)id: number){
        return this.cvService.softDelete(id)
    }

    @Get('recover/:id')
    async restorecv(@Param('id', ParseIntPipe)id: number){
        return this.cvService.restoreCv(id)
    }

}
