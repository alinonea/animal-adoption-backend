import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { AnimalService } from './animal.service';
import { GetUser } from 'src/auth/decorator';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(JwtGuard)
@Controller('animals')
export class AnimalController {
    constructor(private animalService: AnimalService){}

    @Get()
    getInvoices(@GetUser("id") userId: number){
        return this.animalService.getInvoices(userId);

    }

    @Get(':id')
    getInvoiceById(@GetUser('id') userId: number,@Param('id', ParseIntPipe) invoiceId: number){
        return this.animalService.getInvoiceById(userId, invoiceId);
    }
}
