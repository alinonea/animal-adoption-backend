import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AnimalModule } from './animal/animal.module';

@Module({
  imports: [AuthModule, AnimalModule, PrismaModule, ConfigModule.forRoot({isGlobal: true})],
})
export class AppModule {}
