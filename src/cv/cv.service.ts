import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {CvEntity} from "./entities/cv.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {AddCvDto} from "./dto/add-cv.dto";
import {UpdateCvDto} from "./dto/update-cv.dto";

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(CvEntity)
        private cvRepository: Repository<CvEntity>
    ) {
    }

    async findCvByid(id: number) {
        const cv = await this.cvRepository.findOne(id)
        if(!cv){
            throw new NotFoundException(`le cv numero ${id} n'existe pas`)
        }
        return cv
    }

    async getCvs(): Promise<CvEntity[]> {
        return await this.cvRepository.find();
    }

    async AddCv(cv: AddCvDto): Promise<CvEntity> {
        return await this.cvRepository.save(cv);
    }

    // premiere facon de faire une mise a jour
    async UpdateCv(id: number, cv: UpdateCvDto): Promise<CvEntity> {

        // on recupre le cv de l'id en question on remplace les anciennes
        // valeurs du cv par ceux du cv passé en parametre
        const newCv = await this.cvRepository.preload({
            id,
            ...cv
        })

        // tester si l'id n'existe pas
        if(!newCv){
            throw new NotFoundException(`le cv numero ${id} n'existe pas`)
        }

        //on sauvegarde les nouveaux parametres du cv en question
        return await this.cvRepository.save(newCv);
    }

    // deuxieme facon de faire une mise a jour
    async UpdateCv2(updateCriteria, cv: UpdateCvDto){
        return await this.cvRepository.update(updateCriteria, cv)
    }

    async RemoveCv(id: number) {
        const cvToRemove = await this.findCvByid(id)
        return await this.cvRepository.remove(cvToRemove)
    }

    async DeleteCv(id: number) {
        return await this.cvRepository.delete(id)
    }

    async restoreCv(id: number) {
        return await this.cvRepository.restore(id)
    }

    async softDelete(id: number) {
        return await this.cvRepository.softDelete(id)
    }

    // creation d'un querybuilder
    async statCvNumberbyAge(maxAge, minAge = 0){
        const qb = this.cvRepository.createQueryBuilder('cv')

    //chercher le nom du cv par age
         qb.select('cv.age , count(cv.id) as NumbreDeCv')
             .where('cv.age > :ageMin and cv.age < :ageMax')
             .setParameters({ageMin: minAge, ageMax: maxAge})
             .groupBy('cv.age')
        console.log(qb.getSql())
        return qb.getRawMany()

    }
}
