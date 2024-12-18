import { Module } from '@nestjs/common';
import { ImageAlbumService } from './image-album.service';
import { AlbumController } from './album.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImageController } from './image.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [AlbumController, ImageController],
  providers: [ImageAlbumService],
})
export class ImageAlbumModule { }
