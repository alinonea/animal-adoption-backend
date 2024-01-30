import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnimalService {
    constructor(private prisma: PrismaService) {}
    
    getInvoices(userId: number){
        return this.prisma.animal.findMany({
            where: {
              userId,
            },
          });
    }

    getInvoiceById(userId: number, invoiceId: number){
        return this.prisma.animal.findFirst({
            where: {
              id: invoiceId,
              userId,
            },
          });
    }
}
