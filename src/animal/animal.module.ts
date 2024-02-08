import { Module } from '@nestjs/common';
import { AnimalService} from './animal.service';
import { AnimalController } from './animal.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [AnimalService],
  controllers: [AnimalController],
  imports:[ClientsModule.register([
    {
      name: 'ANIMAL_KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'animal',
          brokers: ['0.0.0.0:9093'],
        },
        consumer: {
          groupId: 'animal-consumer'
        }
      }
    },
  ]),
  ClientsModule.register([
    {
      name: 'ANIMAL_RABBIT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://0.0.0.0:5672'],
        queue: "animals_queue",
        queueOptions: {
          durable: false
        },
      },
    },
  ]),
  ],
})
export class AnimalModule {}
