import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WeatherService } from './weather.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [TripController],
  providers: [TripService, WeatherService],
})
export class TripModule { }
