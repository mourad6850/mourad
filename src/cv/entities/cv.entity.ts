import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {TimesTampEntities} from "../../generics/timesTamp.entities";

@Entity('cv')
export class CvEntity extends TimesTampEntities{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name',
    length: 50})
    name: string;

    @Column({length: 50})
    firstname: string;

    @Column()
    age: number;

    @Column()
    cin: number;

    @Column()
    job: string;

    @Column()
    path: string;



}
