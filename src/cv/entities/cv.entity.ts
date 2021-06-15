import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('cv')
export class CvEntity {
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
    jon: string;

}
