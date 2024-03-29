import { Body, Controller, Get, HttpCode, Inject, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { AnimalService } from './animal.service';
import { GetUser } from 'src/auth/decorator';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateAnimalDto } from './dtos/create-animal.dto';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('animals')
export class AnimalController {
    constructor(private animalService: AnimalService, 
        @Inject('ANIMAL_KAFKA_SERVICE') private kafkaClient: ClientProxy,
        @Inject('ANIMAL_RABBIT_SERVICE') private rabbitClient: ClientProxy){
            this.rabbitClient.connect()
        }

    // @Get()
    // getAnimals(@GetUser("id") userId: number){
    //     this.client.emit<number>("adopt_animal",1);
    //     return this.animalService.getInvoices(userId);
    // }

    @Post()
    async saveAnimal(@GetUser() user: User, @Body() createAnimalDto: CreateAnimalDto){
        createAnimalDto['userId'] = user.id
        // console.log(user)
        const res = await this.rabbitClient.send("save_animal", JSON.stringify(createAnimalDto))
        return res
    }

    @Get('/adoption')
    async getAllToAdoptAnimals(){
        const res = await this.rabbitClient.send("get_animals_to_adopt", "")
        return res
    }

    @Post('/:id/adopt')
    @HttpCode(200)
    adoptAnimal(@Param('id', ParseIntPipe) animalId: number){
        this.kafkaClient.emit<number>("adopt_animal",animalId);
        return {
            "message": "Successfully adopted!",
            "code": 200
        }
    }
}
