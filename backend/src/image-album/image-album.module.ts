import { Module } from '@nestjs/common';
import { ImageAlbumService } from './image-album.service';
import { AlbumController } from './album.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImageController } from './image.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AlbumController, ImageController],
  providers: [ImageAlbumService],
})
export class ImageAlbumModule { }
