import {IsIn, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class AddTodoDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
        message: "la longueur doit etre > 5"
    })
    @MaxLength(10, {
        message: "la longueur doit etre < 10"
    })
    name;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description;

    @IsIn(['ouvert' , 'fermé'])
    status;

}