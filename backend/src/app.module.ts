import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TripModule } from './trip/trip.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [UsersModule, TripModule, ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [],
  providers: [],
})
export class AppModule { }
