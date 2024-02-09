import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAnimalDto{
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsString()
    description: string;

    @IsString()
    @IsNotEmpty()
    image: string
}