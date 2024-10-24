import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TripModule } from './trip/trip.module';
import { ConfigModule } from '@nestjs/config';
import { ImageAlbumModule } from './image-album/image-album.module';

@Module({
  imports: [UsersModule, TripModule, ConfigModule.forRoot({
    isGlobal: true,
  }), ImageAlbumModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
